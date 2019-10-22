import openDB from '../openDB'

let deleteDB = async function (tableName, keyValue) {
  try {
    let db = await openDB().then(res => {
      return res.db
    })
    let request = db
      .transaction(tableName, 'readwrite')
      .objectStore(tableName)
      .delete(keyValue)
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
