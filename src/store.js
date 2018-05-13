import Vue from 'vue'
import Vuex from 'vuex'
import zipObject from 'lodash/zipObject'
import flatten from 'lodash/flatten'
import sum from 'lodash/sum'

import {regionsCodes} from './data/regions'
import services, {servicesCodes} from './data/services'
import {queryAWS, setCredentials} from './services/aws'

Vue.use(Vuex)

function makeServiceCollectionModule (collections) {
  return {
    namespaced: true,
    state: zipObject(
      collections.map(c => c.code),
      collections.map(() => ({
        loading: false,
        items: [],
        error: undefined
      }))
    ),
    getters: {
      loadings (state) {
        return Object.keys(state).filter(k => state[k].loading)
      },
      errors (state) {
        return Object.keys(state).filter(k => state[k].error).map(collection => ({
          collection,
          error: state[collection].error
        }))
      },
      count (state) {
        return sum(Object.values(state).map(c => c.items.length))
      }
    },
    mutations: {
      setCollectionKey (state, {collection, key, value}) {
        state[collection][key] = value
      },
      resetCollection (state, collection) {
        state[collection] = {
          loading: false,
          items: [],
          error: undefined
        }
      }
    }
  }
}

function makeRegionModule () {
  return {
    namespaced: true,
    modules: zipObject(
      servicesCodes,
      services.map(({collections}) => makeServiceCollectionModule(collections))
    ),
    getters: {
      loadings (state, getters) {
        return flatten(Object.keys(state).map(service => {
          return getters[`${service}/loadings`].map(collection => ({
            service,
            collection
          }))
        }))
      },
      errors (state, getters) {
        return flatten(Object.keys(state).map(service => {
          return getters[`${service}/errors`].map(errInfo => ({
            ...errInfo,
            service
          }))
        }))
      },
      count (state, getters) {
        return sum(Object.keys(state).map(service => getters[`${service}/count`]))
      }
    }
  }
}

const regionsModule = {
  namespaced: true,
  getters: {
    loadings (state, getters) {
      return flatten(Object.keys(state).map(region => {
        return getters[`${region}/loadings`].map(loadingInfo => ({
          ...loadingInfo,
          region
        }))
      }))
    },
    errors (state, getters) {
      return flatten(Object.keys(state).map(region => {
        return getters[`${region}/errors`].map(errInfo => ({
          ...errInfo,
          region
        }))
      }))
    },
    count (state, getters) {
      return sum(Object.keys(state).map(region => getters[`${region}/count`]))
    }
  },
  modules: zipObject(
    regionsCodes,
    regionsCodes.map(makeRegionModule)
  ),
  actions: {
    async loadCollectionData (context, payload) {
      const {
        service,
        region,
        collection
      } = payload
      context.commit(`${region}/${service}/setCollectionKey`, {
        collection,
        key: 'loading',
        value: true
      })
      try {
        const result = await queryAWS(region, service, collection)
        context.commit(`${region}/${service}/setCollectionKey`, {
          collection,
          key: 'items',
          value: result
        })
      } catch (e) {
        console.log('fail', service, region, collection, e)
        context.commit(`${region}/${service}/setCollectionKey`, {
          collection,
          key: 'error',
          value: e
        })
      }
      context.commit(`${region}/${service}/setCollectionKey`, {
        collection,
        key: 'loading',
        value: false
      })
    },
    loadRegionData ({state, dispatch}, region) {
      for (const service in state[region]) {
        for (const collection in state[region][service]) {
          dispatch('loadCollectionData', {
            region,
            service,
            collection
          })
        }
      }
    },
    loadAllData ({state, dispatch}) {
      for (const region in state) {
        dispatch('loadRegionData', region)
      }
    },
    resetRegionData ({state, commit}, region) {
      for (const service in state[region]) {
        for (const collection in state[region][service]) {
          commit(`${region}/${service}/resetCollection`, collection)
        }
      }
    },
    resetAllData ({state, dispatch}) {
      for (const region in state) {
        dispatch('resetRegionData', region)
      }
    }
  }
}

export default new Vuex.Store({
  state: {
    credentials: undefined
  },
  mutations: {
    setCredentials (state, credentials) {
      setCredentials(credentials)
      state.credentials = credentials
    }
  },
  actions: {},
  modules: {
    regions: regionsModule
  }
})
