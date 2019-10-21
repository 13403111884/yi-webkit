import openDB from '../openDB'

let get = async function (tableName, keyValue, indexCursor) {
  try {
    let db = await openDB()
    let store = db.transaction(tableName, 'readonly').objectStore(tableName)
    let request
    request = !keyValue
      ? store.openCursor()
      : indexCursor
        ? store.index(indexCursor).get(keyValue)
        : store.get(keyValue)
    let data = []
    return new Promise(resolve => {
      request.onerror = function () {
        resolve('查询数据失败')
      }
      request.onsuccess = function (event) {
        if (!keyValue && !indexCursor) {
          if (event.target.result) {
            data.push(event.target.result.value)
            event.target.result.continue()
          } else {
            resolve(data)
          }
        } else {
          resolve([event.target.result])
        }
      }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export default get
