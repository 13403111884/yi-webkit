import { indexedDB, store, database } from './../../config'

let initDB = async (params) => {
  let request = indexedDB.open(database.n, database.v || null)
  request.onerror = function (err) {
    console.log(`%c 打开数据库失败`, 'color: red')
    console.log('错误：', err)
  }

  request.onsuccess = function () {}
  request.onupgradeneeded = function (event) {
    let db = event.target.result
    let arr = params || store
    if (!db) return
    arr.forEach(item => {
      if (!db.objectStoreNames.contains(item.name)) {
        var objectStore = db.createObjectStore(item.name, {
          keyPath: item.key,
          autoIncrement: true
        })
        for (let i = 0; i < item.cursorIndex.length; i++) {
          const element = item.cursorIndex[i]
          objectStore.createIndex(element.name, element.name, {
            unique: element.unique
          })
        }
      }
    })
  }
}

export default initDB
