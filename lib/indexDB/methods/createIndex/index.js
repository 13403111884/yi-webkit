import { indexedDB, database } from '../../config'

export default function createIndex (tableName, keyName, indexName, unique) {
  try {
    let request = indexedDB.open(database.n, database.v++)
    request.onupgradeneeded = function (event) {
      const db = event.target.result
      db.transaction(tableName, 'readonly').objectStore(tableName)
        .createIndex(keyName, indexName, { unique })
    }
  } catch (error) {
    return Promise.resolve(error)
  }
}
