import openDB from '../openDB'
import createIndex from '../createIndex'

const getRange = {
  only (Range) {
    return IDBKeyRange.only(Range)
  },
  lowerBound (Range) {
    return IDBKeyRange.lowerBound(Range)
  },
  upperBound (Range) {
    return IDBKeyRange.upperBound(Range)
  },
  bound (Range) {
    return IDBKeyRange.bound(Range)
  }
}
let search = async function (tableName, mode, item) {
  try {
    const db = await openDB().then(res => {
      return res.db
    })
    const store = db.transaction(tableName, 'readwrite').objectStore(tableName)
    const arr = []
    let request, boundKeyRange
    let Range = {}
    for (let key in item) { item[key] && (Range[key] = item[key]) }
    if (Range && Object.keys(Range).length) {
      let keyRange = Object.keys(Range)
      let valueRange = Object.values(Range)
      if (keyRange.length === 1) {
        boundKeyRange = getRange[mode](Range[keyRange[0]])
        request = store.index(keyRange[0]).openCursor(boundKeyRange)
      } else {
        let key = keyRange.join('')
        // createIndex(tableName, key, keyRange, false)
        boundKeyRange = getRange[mode](valueRange)
        request = store.index(key).openCursor(boundKeyRange)
      }
    } else {
      request = store.openCursor()
    }
    return await new Promise(resolve => {
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

export default search
