// indexedDB兼容
const indexedDB = window.indexedDB || window.webkitindexedDB || window.msIndexedDB || window.mozIndexedDB
// name:表名  key:主键  cursorIndex 索引
// const store = {
//   teacher: {
//     name: 'teacher',
//     key: 'id',
//     cursorIndex: [{ name: 'teachNum', unique: false }]
//   },
//   student: {
//     name: 'student',
//     key: 'id',
//     cursorIndex: [{ name: 'stuNum', unique: false }]
//   }
// }
const store = []

let database = {
  n: 'init'
}

export {
  indexedDB,
  store,
  database
}

export default { indexedDB, store, database }
