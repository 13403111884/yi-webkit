import openDB from './../openDB'

let deleteDB = async function (table, keyValue) {
  try {
    let db = await openDB()
    let request = db
      .transaction(table.name, 'readwrite')
      .objectStore(table.name)
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
