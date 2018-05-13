export default class PromiseQueue {
  constructor (maxPendingPromises = Infinity) {
    this.pendingPromises = 0
    this.maxPendingPromises = maxPendingPromises
    this.queue = []
  }

  add (promiseGenerator) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        promiseGenerator,
        resolve,
        reject
      })
      this._dequeue()
    })
  }

  async _dequeue () {
    if (this.pendingPromises >= this.maxPendingPromises) {
      return false
    }
    const item = this.queue.shift()
    if (!item) {
      return false
    }
    this.pendingPromises++
    try {
      const value = await item.promiseGenerator()
      item.resolve(value)
    } catch (err) {
      item.reject(err)
    }
    this.pendingPromises--
    this._dequeue()
  }
}
