import AWS from 'aws-sdk'
import get from 'lodash/get'
import PromiseQueue from '../tools/promise-queue'
import services from '../data/services'

const queue = new PromiseQueue(10)

export function queueLength () {
  return queue.queue.length
}

export function pendingLength () {
  return queue.pendingPromises
}

export function queryAWS (regionCode, serviceCode, collectionCode) {
  return queue.add(async () => {
    const service = services.find(({code}) => code === serviceCode)
    const collection = service.collections.find(({code}) => code === collectionCode)
    const ob = new AWS[service.className]({
      region: regionCode
    })
    const res = await ob[collection.method]().promise()
    return get(res, collection.resultPath)
  })
}

export function setCredentials (credentials) {
  AWS.config.credentials = credentials && new AWS.Credentials(
    credentials.aws_access_key_id,
    credentials.aws_secret_access_key
  )
}
