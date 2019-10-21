import openDB from '../openDB'

let insertDB = async function (tableName, data) {
  try {
    let db = await openDB()
    let request = db.transaction([tableName], 'readwrite').objectStore(tableName).add(data)
    return new Promise((resolve, reject) => {
      request.onerror = function (error) {
        console.log('数据写入失败')
        reject(error)
      }
      request.onsuccess = function () {
        resolve(true)
      }
    })
  } catch (error) {
    return Promise.resolve(error)
  }
}

export default insertDB
