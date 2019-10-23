import openDB from '../openDB'

let insertDB = async function (tableName, data) {
  try {
    let db = await openDB().then(res => {
      return res.db
    })
    let request = db.transaction(tableName, 'readwrite')
      .objectStore(tableName)
      .add(data)
    return new Promise((resolve, reject) => {
      request.onerror = function (error) {
        reject(error)
      }
      request.onsuccess = function (event) {
        resolve(event.target.result)
      }
    })
  } catch (error) {
    return Promise.resolve(error)
  }
}

export default insertDB
