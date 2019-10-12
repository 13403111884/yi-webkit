import openDB from './../openDB'

let handleDataByCursor = async function (table, keyRange) {
  try {
    let kRange = keyRange || ''
    let db = await openDB()
    let store = db.transaction(table, 'readwrite').objectStore(table)
    let request
    request = store.openCursor(kRange)
    return new Promise(resolve => {
      request.onerror = function (error) {
        resolve(error)
      }
      request.onsuccess = function (event) {
        let cursor = event.target.result
        resolve(cursor)
      }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export default handleDataByCursor
