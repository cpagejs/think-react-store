/**
 * 中间件参数
 * @param {Object} store store
 * @param {Object} prevState 更新前的state值
 * @param {Object} nextState 更新后的state值
 * @param {Object} action 派发的action
 */
export default function(store, prevState, nextState, action){
  console.log('----日志log-----')
  console.log(`修改前：${JSON.stringify(prevState)}`, action)
  console.log(`修改后：${JSON.stringify(nextState)}`)
}