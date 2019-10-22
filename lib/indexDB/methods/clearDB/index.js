import openDB from '../openDB'

let clear = async function (tableName) {
  let db = openDB().then(res => {
    return res.db
  })
  let store = db.transaction([tableName], 'readwrite').objectStore(tableName)
  let clear = store.clear()
  clear.onsuccess = function () {
    console.log('清空成功')
  }
}

export default clear
