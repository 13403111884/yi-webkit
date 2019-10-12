import openDB from './../openDB'

let handleDataByIndex = async function (table, keyRange, sursorIndex) {
  try {
    let kRange = keyRange || ''
    let db = await openDB()
    let store = db.transaction(table, 'readwrite').objectStore(table)
    let request
    request = store.index(sursorIndex).openCursor(kRange)
    return new Promise(resolve => {
      request.onerror = function (err) {
        resolve(err)
      }
      request.onsuccess = function (event) {
        let cursor = event.target.result
        if (cursor) {
          resolve(cursor)
        }
      }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export default handleDataByIndex
