let closeDB = async function (db) {
  try {
    let d
    if (!db) {
      d = await this.openDB()
    }
    let closeQuest = d.closeDB()
    return new Promise(resolve => {
      closeQuest.onerror = function () {
        resolve(false)
      }
      closeQuest.onsuccess = function () {
        resolve(true)
      }
    })
  } catch (error) {
    return Promise.resolve(false)
  }
}

export default closeDB
