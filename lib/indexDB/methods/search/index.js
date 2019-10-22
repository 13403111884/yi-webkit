import openDB from '../openDB'

let handleDataByCursor = async function (tableName, item) {
  try {
    const db = await openDB().then(res => {
      return res.db
    })
    const store = db.transaction(tableName, 'readwrite').objectStore(tableName)
    const arr = []
    let request, boundKeyRange
    let Range = {}
    console.log(item)
    for (let key in item) { item[key] && (Range[key] = item[key]) }
    if (Range && Object.keys(Range).length) {
      let keyRange = Object.keys(Range)
      let valueRange = Object.values(Range)
      if (keyRange.length === 1) {
        boundKeyRange = IDBKeyRange.only(Range[keyRange[0]])
        request = store.index(keyRange[0]).openCursor(boundKeyRange)
      } else {
        alert('暂不支持多条检索')
        boundKeyRange = IDBKeyRange.only(Range[keyRange[0]])
        request = store.index(keyRange[0]).openCursor(boundKeyRange)
      }
    } else {
      request = store.openCursor()
    }
    return new Promise(resolve => {
      request.onerror = function (error) {
        resolve(error)
      }
      request.onsuccess = function (event) {
        let cursor = event.target.result
        if (cursor) {
          arr.push(cursor.value)
          cursor.continue()
        } else {
          resolve(arr)
        }
      }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export default handleDataByCursor
