import { indexedDB, database } from './../../config'

let openDB = function () {
  return new Promise((resolve, reject) => {
    let request = indexedDB.open(database.n, database.v || null)

    request.onerror = function (error) {
      console.log('打开数据库失败')
      reject(error)
    }
    request.onsuccess = function (event) {
      resolve(event.target.result)
    }
  })
}

export default openDB
