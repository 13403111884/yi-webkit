import openDB from '../openDB'

let closeDB = async function () {
  try {
    let d = await openDB()
    let closeQuest = d.close()
    console.log(closeQuest)
    // return new Promise(resolve => {
    //   closeQuest.onerror = function () {
    //     resolve(false)
    //   }
    //   closeQuest.onsuccess = function () {
    //     resolve(true)
    //   }
    // })
  } catch (error) {
    return Promise.resolve(false)
  }
}

export default closeDB
