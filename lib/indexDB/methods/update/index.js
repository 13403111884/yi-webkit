import openDB from '../openDB'

let deleteDB = async function (tableName, data) {
  try {
    let db = await openDB()
    let request = db
      .transaction(tableName, 'readwrite')
      .objectStore(tableName)
      .put(data)
    return new Promise(resolve => {
      request.onerror = function () {
        resolve(false)
      }
      request.onsuccess = function () {
        resolve(true)
      }
    })
  } catch (error) {
    return Promise.resolve(false)
  }
}

export default deleteDB
