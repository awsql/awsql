import Vue from 'vue'
import Vuex from 'vuex'
import flattenDeep from 'lodash/flattenDeep'
import find from 'lodash/find'
import sum from 'lodash/sum'
import groupBy from 'lodash/groupBy'

import {regionsCodes} from './data/regions'
import services from './data/services'
import {queryAWS, setCredentials, queueLength, pendingLength} from './services/aws'
import {createCollectionsStore} from './services/indexedDB'

Vue.use(Vuex)

const collectionsStore = createCollectionsStore(queryAWS)

export default new Vuex.Store({
  state: {
    pendingLength: 0,
    queueLength: 0,
    credentials: undefined,
    collections: flattenDeep(regionsCodes.map(regionCode => services.map(service => service.collections.map(collection => ({
      region: regionCode,
      service: service.code,
      collection: collection.code,
      items: [],
      loading: false,
      error: undefined
    })))))
  },
  getters: {
    collsByRegion: state => groupBy(state.collections, 'region'),
    collItem: state => (region, service, collection) => {
      return find(state.collections, {region, service, collection})
    },
    regionLoadings: (state, {collsByRegion}) => region => {
      return collsByRegion[region].filter(c => c.loading)
    },
    regionErrors: (state, {collsByRegion}) => region => {
      return collsByRegion[region].filter(c => c.error)
    },
    regionCount: (state, {collsByRegion}) => region => {
      return sum(collsByRegion[region].map(c => c.items.length))
    }
  },
  mutations: {
    setCredentials (state, credentials) {
      setCredentials(credentials)
      state.credentials = credentials
    },
    updateCounts (state) {
      state.pendingLength = pendingLength()
      state.queueLength = queueLength()
    },
    setCollKey (state, {region, service, collection, key, value}) {
      const coll = find(state.collections, {region, service, collection})
      coll[key] = value
    },
    resetColl (state, {region, service, collection}) {
      const coll = find(state.collections, {region, service, collection})
      Object.assign(coll, {
        items: [],
        loading: false,
        error: undefined
      })
    }
  },
  actions: {
    async loadCollData (context, {service, region, collection}) {
      context.commit('updateCounts')
      context.commit('setCollKey', {region, service, collection, key: 'loading', value: true})
      try {
        const items = await collectionsStore.getCollectionItems(region, service, collection)
        context.commit('setCollKey', {region, service, collection, key: 'items', value: items})
      } catch (e) {
        console.log('fail', service, region, collection, e)
        context.commit('setCollKey', {region, service, collection, key: 'error', value: e})
      }
      context.commit('setCollKey', {region, service, collection, key: 'loading', value: false})
      context.commit('updateCounts')
    },
    loadRegionData ({state, dispatch}, regionCode) {
      for (const service of services) {
        for (const collection of service.collections) {
          dispatch('loadCollData', {
            region: regionCode,
            service: service.code,
            collection: collection.code
          })
        }
      }
    },
    loadAllData ({state, dispatch}) {
      for (const region of regionsCodes) {
        dispatch('loadRegionData', region)
      }
    },
    resetRegionData ({state, commit}, regionCode) {
      for (const service of services) {
        for (const collection of service.collections) {
          commit('resetColl', {
            region: regionCode,
            service: service.code,
            collection: collection.code
          })
        }
      }
    },
    resetAllData ({state, dispatch}) {
      for (const region of regionsCodes) {
        dispatch('resetRegionData', region)
      }
    }
  },
  modules: {}
})
