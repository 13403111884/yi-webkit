import { indexedDB, database } from '../../config'

let openDB = function () {
  return new Promise((resolve, reject) => {
    let request = indexedDB.open(database.n, database.v)

    request.onerror = function (error) {
      reject(error)
    }
    request.onsuccess = function (event) {
      resolve(event.target.result)
    }
  })
}

export default openDB
