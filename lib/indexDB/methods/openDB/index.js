/**
 * 打开数据库的结果时触发的4种事件：
 * onupgradeneeded：第一次打开该数据库，或者数据库版本发生变化。
 * onblocked：上一次的数据库连接还未关闭。
 * onsuccess：打开成功。
 * onerror：打开失败。
 * 触发顺序为从上到下。
 * 回调函数接受一个事件对象event作为参数，它的target.result属性就指向打开的IndexedDB数据库。
 */

import { indexedDB, store, database } from '../../config'
let openDB = function (fn) {
  let request = indexedDB.open(database.n)
  return new Promise((resolve, reject) => {
    request.onupgradeneeded = function (event) {
      let db = event.target.result
      let arr = store || []
      if (!db) return
      arr.forEach(item => {
        /**
         * objectStoreNames属性返回一个对象，里面包含了所有对象仓库名称，
         * objectStoreNames属性的 contains 方法可以检查对象仓库是否存在，参数为要检查的对象仓库名。
         */
        if (!db.objectStoreNames.contains(item.name)) {
          /**
           * createObjectStore方法用于创建存放数据的对象仓库
           * 第一个参数为 对象仓库名称
           * 第二个参数用来设置对象仓库的属性
           *    keyPath用来设置键名，键名的属性值不可重复
           *    autoIncrement用来设置 键名 是否递增
           */
          let objectStore = db.createObjectStore(item.name, {
            keyPath: item.key,
            autoIncrement: true
          })
          for (let i = 0; i < item.cursorIndex.length; i++) {
            const element = item.cursorIndex[i]
            /**
             * createIndex方法用于创建索引
             * 第一个参数为索引的名称
             * 第二个参数为索引属性名
             * 第三个参数用来设定索引特性
             *    unique 用来设定属性是否是唯一值
             */
            objectStore.createIndex(element.name, element.value || element.name, {
              unique: element.unique
            })
          }
        }
      })
    }

    fn && (request.onblocked = function (event) {
      fn(event)
    })

    request.onsuccess = function (event) {
      database.v = event.target.result.version
      resolve({
        database: request,
        db: event.target.result
      })
    }

    request.onerror = function (error) { reject(error) }
  })
}

export default openDB
