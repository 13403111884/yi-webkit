import openDB from '../openDB'

let closeDB = async function () {
  try {
    let database = await openDB().then(res => {
      return res.database
    })
    database.onsuccess = function () {
      let db = database.result
      db.close()
    }
  } catch (error) {
    return Promise.resolve(error)
  }
}

export default closeDB
