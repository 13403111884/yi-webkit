import { store, database } from './../../config'

let setStore = (params) => {
  if (params && params.table) {
    if (params.table instanceof Array) {
      params.table.length && params.table.forEach(item => {
        store.push(item)
      })
    } else if (params.table instanceof Object) {
      store.push(params.table)
    } else {
      console.log('%c ', 'color: red', `setStore 参数必须为 数组 或 json。`)
    }
  } else {
    console.log('%c ', 'color: red', `setStore 方法未接受到参数`)
  }
  if (params && params.database) {
    database.n = params.database.n
    database.v = params.database.v
  }
}

export default setStore
