import { indexedDB, store } from './config'
import setStore from './methods/setStore'
import initDB from './methods/initDB'
import openDB from './methods/openDB'
import closeDB from './methods/closeDB'
import insertDB from './methods/insertDB'
import deleteDB from './methods/deleteDB'
import deleteTable from './methods/deleteTable'
import update from './methods/update'
import getDB from './methods/getDB'
import handleDataByCursor from './methods/handleDataByCursor'
import handleDataByIndex from './methods/handleDataByIndex'
import createCursorIndex from './methods/createCursorIndex'
import clearDB from './methods/clearDB'

export const methods = {
  indexedDB, // indexedDB兼容
  store, // name:表名  key:主键  cursorIndex 索引
  setStore, // 初始化表配置
  initDB, // 初始化
  openDB, // 打开数据库
  closeDB, // 关闭数据库
  insertDB, // 添加数据，add添加新值
  deleteDB, // 删除数据
  deleteTable, // 删除表
  update, // 更新
  getDB, // 查询数据 表名 索引值 索引 key  没有value key为key 而不是索引
  handleDataByCursor, // 通过游标操作数据, callback中要有游标移动方式
  handleDataByIndex, // 通过索引游标操作数据, callback中要有游标移动方式
  createCursorIndex, // 创建游标索引
  clearDB // 清空数据
}

export default {
  ...methods
}