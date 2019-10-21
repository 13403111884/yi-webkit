import { indexedDB } from '../../config'

let deleteTable = function (table) {
  let deleteQuest = indexedDB.deleteDatabase(table)
  deleteQuest.onerror = function () {
    return Promise.resolve(false)
  }
  deleteQuest.onsuccess = function () {
    return Promise.resolve(true)
  }
}

export default deleteTable
