/**
** 打开数据库的结果时触发的4种事件：
 *  onupgradeneeded：第一次打开该数据库，或者数据库版本发生变化。
 *  onblocked：上一次的数据库连接还未关闭。
 *  onsuccess：打开成功。
 *  onerror：打开失败。
 *  触发顺序为从上到下。
 *  回调函数接受一个事件对象event作为参数，它的target.result属性就指向打开的IndexedDB数据库。
 *
 *  target.result.objectStoreNames属性返回一个对象，里面包含了所有对象仓库名称，
 *  target.result.objectStoreNames属性的 contains 方法可以检查对象仓库是否存在，参数为要检查的对象仓库名。
 *
 * createObjectStore方法用于创建存放数据的对象仓库
 *  第一个参数为 对象仓库名称
 *  第二个参数用来设置对象仓库的属性
 *    keyPath用来设置键名，键名的属性值不可重复
 *    autoIncrement用来设置 键名 是否递增
 *
 * createIndex方法用于创建索引
 *  第一个参数为索引的名称
 *  第二个参数为索引属性名
 *  第三个参数用来设定索引特性
 *    unique 用来设定属性是否是唯一值
 *
 * transaction 方法用于创建一个数据库事务,操作数据必须先创建数据库事务。
 *   第一个参数指定对象仓库，
 *   第二个参数设置操作类型 readonly（只读）和 readwrite（读写）
 * transaction 方法有三个事件：
 *   onabort：事务中断。
 *   oncomplete：事务完成。
 *   onerror：事务出错。
 *
 * transaction 方法返回一个事务对象 objectStore ，用于获取指定的对象仓库。
 * 参数为对象仓库名。
 * objectStore 方法：
 *  add：添加数据。
 *   第一个参数是添加额数据，
 *   第二个参数是对键名的设置，如果在创建仓库时已指定，这里可以不指定。
 *   add方法是异步的，有自己的success和error事件，可以对这两个事件指定回调函数。
 *  get：获取数据。
 *   参数为数据的键名
 *   get方法也是异步的，会触发自己的success和error事件，可以对它们指定回调函数。
 *  put：更新数据。
 *   put方法的用法与add方法相近。
 *  delete：删除数据。
 *   delete方法的参数是数据的键名。
 *   另外，delete也是一个异步操作，可以为它指定回调函数。
 *  openCursor：遍历数据。
 *   openCursor 在当前对象仓库里面建立一个读取光标（cursor）。
 *   openCursor方法也是异步的，有自己的success和error事件，可以对它们指定回调函数。
 *   第一个参数为要查询的键 或 IDBKeyRange 对象，默认全部键范围。
 *   第二个参数指定移动的方向，有效值（默认值是 next）：
 *      next：从前往后获取所有数据（包括重复数据）。
 *      nextunique：从后往前获取所有数据（包括重复数据）。
 *      prev：从前往后获取数据（重复数据只取第一条，索引重复即认为重复，下同）。
 *      prevunique：从后往前获取数据（重复数据只取第一条）
 *  index：用于从对象仓库返回指定的索引（必须是已创建的索引）。
 *    参数为需要指定的索引
 *
 * IDBKeyRange：浏览器原生对象，作用是生成一个表示范围的Range对象。
 * 生成Range对象以后，将它作为参数输入 openCursor 方法，就可以在所设定的范围内读取数据。
 * 生成方法（布尔值默认为 fasle，表示可以等于）：
 *    lowerBound方法：指定范围的下限。
 *      第一个参数指定下限
 *      第二个参数为 布尔值，设定是否可以等于下限。
 *    upperBound方法：指定范围的上限。
 *      第一个参数指定上限
 *      第二个参数为 布尔值，设定是否可以等于下限。
 *    bound方法：指定范围的下上限。
 *      第一个参数指定下限
 *      第二个参数指定上限
 *      第三个参数为 布尔值，设定是否可以等于下限。
 *      第四个参数为 布尔值，设定是否可以等于上限。
 *    only方法：指定范围中只有一个值。
 */
