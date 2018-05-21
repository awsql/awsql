const collectionsStoreName = 'collections'

function onversionchange (event) {
  console.info('onversionchange', event)
}

let databasePromise

function getInstance () {
  if (!databasePromise) {
    databasePromise = new Promise((resolve, reject) => {
      const request = indexedDB.open('AWSQL_STORE', 1)
      request.onsuccess = (event) => {
        const database = event.target.result
        database.onversionchange = onversionchange
        resolve(database)
      }

      request.onerror = () => reject(request.error)

      request.onupgradeneeded = (event) => {
        const database = event.target.result
        database.onversionchange = onversionchange

        const uniqueFalse = {unique: false}
        if (!database.objectStoreNames.contains(collectionsStoreName)) {
          const store = database.createObjectStore(collectionsStoreName, {keyPath: 'key'})
          store.createIndex('region', 'region', uniqueFalse)
          store.createIndex('service', 'service', uniqueFalse)
          store.createIndex('collection', 'collection', uniqueFalse)
        }
      }
    })
  }
  return databasePromise
}

function getInstanceWithPromise (executor) {
  return getInstance().then(database => (
    new Promise((resolve, reject) => executor(database, resolve, reject))
  ))
}

export function createCollectionsStore (getItemsFn) {
  const makeKey = (region, service, collection) => `${region}_${service}_${collection}`
  return {
    get (region, service, collection) {
      const key = makeKey(region, service, collection)
      return getInstanceWithPromise((database, resolve, reject) => {
        const request = database.transaction(collectionsStoreName).objectStore(collectionsStoreName).get(key)
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
      })
    },

    async getCollectionItems (region, service, collection) {
      let items
      const localCollectionItem = await this.get(region, service, collection)
      if (localCollectionItem && localCollectionItem.date && (Date.now() - localCollectionItem.date.getTime()) < 3600000) {
        items = localCollectionItem.items
      } else {
        items = await getItemsFn(region, service, collection)
        await this.set(region, service, collection, items)
      }
      return items
    },

    set (region, service, collection, items) {
      const key = makeKey(region, service, collection)
      return getInstanceWithPromise((database, resolve, reject) => {
        const obj = {
          key,
          region,
          service,
          collection,
          items,
          date: new Date()
        }
        const request = database.transaction([collectionsStoreName], 'readwrite').objectStore(collectionsStoreName).put(obj)
        request.onsuccess = () => resolve(obj)
        request.onerror = () => reject(request.error)
      })
    }
  }
}
