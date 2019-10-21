import { indexedDB, database } from '../../config'

let clear = async function (tableName) {
  let db = indexedDB.open(database.n)
  let store = await db.transaction(tableName, 'readwrite').objectStore(tableName)
  store.clear()
}

export default clear
