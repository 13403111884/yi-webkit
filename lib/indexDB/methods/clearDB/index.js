import openDB from './../openDB'

let clear = async function (table) {
  let db = await openDB()
  let store = db.transaction(table.name, 'readwrite').objectStore(table.name)
  store.clear()
}

export default clear
