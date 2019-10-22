import openDB from '../openDB'

let closeDB = async function () {
  try {
    let db = await openDB().then(res => {
      return res.db
    })
    db.close()
  } catch (error) {
    return Promise.resolve(error)
  }
}

export default closeDB
