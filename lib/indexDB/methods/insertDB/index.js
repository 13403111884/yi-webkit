import openDB from './../openDB'

let insertDB = async function (table, data) {
  try {
    let db = await openDB()
    let request = db
      .transaction(table.name, 'readwrite')
      .objectStore(table.name)
      .add(data)

    return new Promise((resolve, reject) => {
      request.onerror = function (error) {
        reject(error)
      }
      request.onsuccess = function () {
        resolve(true)
      }
    })
  } catch (error) {
    console.log(error)
    return Promise.resolve(false)
  }
}

export default insertDB
