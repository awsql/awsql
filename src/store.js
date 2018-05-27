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
    collItem: state => (region, service, collection) => find(state.collections, {region, service, collection}),
    regionLoadings: (state, {collsByRegion}) => region => collsByRegion[region].filter(c => c.loading),
    regionErrors: (state, {collsByRegion}) => region => collsByRegion[region].filter(c => c.error),
    regionCount: (state, {collsByRegion}) => region => sum(collsByRegion[region].map(c => c.items.length))
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
    updateColl (state, {region, service, collection, ...update}) {
      const coll = find(state.collections, {region, service, collection})
      Object.assign(coll, update)
    }
  },
  actions: {
    async loadCollData (context, {service, region, collection}) {
      context.commit('updateCounts')
      context.commit('updateColl', {region, service, collection, loading: true})
      try {
        const items = await collectionsStore.getCollectionItems(region, service, collection)
        context.commit('updateColl', {region, service, collection, items})
      } catch (error) {
        console.log('fail', service, region, collection, error)
        context.commit('updateColl', {region, service, collection, error})
      }
      context.commit('updateColl', {region, service, collection, loading: false})
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
          commit('updateColl', {
            region: regionCode,
            service: service.code,
            collection: collection.code,
            items: [],
            loading: false,
            error: undefined
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
