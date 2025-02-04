import pick from "ramda/src/pick";

/**
 * 中间件参数
 * @param {Object} store store
 * @param {Object} prevState 更新前的state值
 * @param {Object} nextState 更新后的state值
 * @param {Object} action 派发的action
 */
export default function cache(
  store,
  prevState,
  nextState,
  action,
  actionAsync,
  asyncKey,
  cache
) {
  const CACHE = "react-store:cache";

  if (cache && cache.length) {
    localStorage.setItem(CACHE, JSON.stringify(pick(cache, nextState)));
  }
}
