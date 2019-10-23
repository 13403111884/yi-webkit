import openDB from '../openDB'

let clear = async function (tableName) {
  let db = await openDB().then(res => {
    return res.db
  })
  let store = db.transaction(tableName, 'readwrite').objectStore(tableName)
  store.clear()
}

export default clear
