import openDB from './../openDB'

let createCursorIndex = async function (table, cursorIndex, unique) {
  var db = await openDB()
  let store = db.transaction(table, 'readwrite').objectStore(table)
  store.createIndex(cursorIndex, cursorIndex, {
    unique: unique
  })
  return Promise.resolve()
}

export default createCursorIndex
