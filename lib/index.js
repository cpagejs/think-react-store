"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StoreContext = void 0;
exports.StoreProvider = StoreProvider;
exports.connect = connect;
exports.useDispatchHook = useDispatchHook;
exports.useStateHook = useStateHook;
exports.useStoreHook = useStoreHook;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireWildcard(require("react"));
var _util = require("./util");
var _is = _interopRequireDefault(require("ramda/src/is"));
var _isEmpty = _interopRequireDefault(require("ramda/src/isEmpty"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const StoreContext = exports.StoreContext = /*#__PURE__*/_react.default.createContext();
const LOADING = "hook-loading-clear";
let initialState = {},
  initStore = {},
  //传入的store
  asyncKey,
  //异步的key
  newData,
  //新的数据
  methodsName = {},
  //所有方法名
  actionAsync; //触发的异步方法

function doRun(key, actionArr, type, store, state, payload) {
  let res;
  actionArr.forEach(item => {
    if ((0, _util.get)([key, item, type], store)) {
      res = (0, _util.run)([key, item, type], store, state, payload);
    }
  });
  newData = res;
  return res;
}
function reducer(state, action) {
  const {
    key,
    type,
    payload
  } = action;
  const _key = key || asyncKey;
  return {
    ...state,
    [_key]: {
      ...state[_key],
      ...doRun(_key, ["methods", "reducers", "effects"], type, initStore, state[_key], payload)
    }
  };
}
function StoreProvider(props) {
  var _middleware$filter;
  const {
    store,
    middleware
  } = props;
  if (!store) {
    console.error(`
      store 必须有值，类似于：
      <StoreProvider store={store}>
      `);
    return null;
  }
  const hasLoadingMiddleware = middleware === null || middleware === void 0 || (_middleware$filter = middleware.filter(item => item.name === "loading")) === null || _middleware$filter === void 0 ? void 0 : _middleware$filter.length;
  // const propsCacheExit = props?.cache?.length;

  if (hasLoadingMiddleware) {
    function setLoadingTrue() {
      if ((0, _isEmpty.default)(methodsName)) {
        Object.keys(store).forEach(item => {
          methodsName[item] = {
            ...(0, _util.transBool)((0, _util.get)([item, "methods"], store), false),
            ...(0, _util.transBool)((0, _util.get)([item, "reducers"], store), false),
            ...(0, _util.transBool)((0, _util.get)([item, "effects"], store), false)
          };
        });
      }
    }
    setLoadingTrue();
  }
  initStore = store;

  // 中间件
  function middlewareReducer(prevState, action) {
    if (!action) {
      return store;
    }
    if (middleware) {
      if (!(0, _is.default)(Array, middleware)) {
        throw new Error("middleware中间件必须为数组");
      }
    }
    let nextState = reducer(prevState, action);
    middleware && middleware.forEach(item => {
      const newState = item(store, prevState, nextState, action, actionAsync, asyncKey, props === null || props === void 0 ? void 0 : props.cache);
      if (newState) {
        nextState = newState;
      }
    });
    return nextState;
  }
  Object.keys(initStore).forEach(item => {
    initialState[item] = initStore[item]["state"];
  });
  if (hasLoadingMiddleware && !initialState["loading"]) {
    initialState["loading"] = methodsName;
  }
  let [state, origin_dispatch] = (0, _react.useReducer)(middlewareReducer, initialState);
  const dispatch = async (action, payload, key) => {
    actionAsync = undefined;
    if ((0, _util.get)([asyncKey, "reducers", action.type], initStore)) {
      return origin_dispatch(action);
    }
    if (!(0, _util.isAsyncFunction)(action) && (0, _util.inWhich)("effects", initStore[action.key || asyncKey], action.type)) {
      asyncKey = action.key;
      actionAsync = action.type;
      if (hasLoadingMiddleware) {
        origin_dispatch({
          key: asyncKey,
          type: LOADING,
          payload: actionAsync
        });
      }
      const func = (0, _util.get)([action.key, "effects", action.type], initStore);
      return await func(origin_dispatch, state, action.payload);
    }
    if ((0, _util.isAsyncFunction)(action) || (0, _util.get)([asyncKey, "effects", action], initStore)) {
      asyncKey = key;
      actionAsync = action.name;
      if (hasLoadingMiddleware) {
        origin_dispatch({
          key: asyncKey,
          type: LOADING,
          payload: action.name
        });
      }
      return await action(origin_dispatch, state, payload);
    }
    if (!(0, _util.isAsyncFunction)(action) && (0, _is.default)(Function, action)) {
      if ((0, _is.default)(Object, action())) {
        const _action = (0, _util.get)([action().key, "methods", action().type], initStore) || (0, _util.get)([action().key, "effects", action().type], initStore);
        if ((0, _is.default)(Function, _action)) {
          asyncKey = action().key;
          actionAsync = action().type;
          if (hasLoadingMiddleware) {
            origin_dispatch({
              key: asyncKey,
              type: LOADING,
              payload: actionAsync
            });
          }
          return await _action(origin_dispatch, state, action().payload);
        }
      }
    }
    return origin_dispatch(action);
  };
  return /*#__PURE__*/_react.default.createElement(StoreContext.Provider, {
    value: {
      state,
      dispatch
    }
  }, props.children);
}
function useDispatchHook(key) {
  const store = (0, _react.useContext)(StoreContext);
  if (key) {
    asyncKey = key;
  }
  return store.dispatch;
}
function useStateHook(key) {
  const store = (0, _react.useContext)(StoreContext);
  return key ? (0, _util.get)(["state", key], store) : (0, _util.get)(["state"], store);
}

/*返回state和方法
{
  user: {id:1,getUser(state,payload){xxxx}}
}
*/
function useStoreHook() {
  const {
    state,
    dispatch
  } = (0, _react.useContext)(StoreContext);
  let _store = {};
  Object.keys(state).forEach(key => {
    let _methods = {};
    const methods = {
      ...(0, _util.get)([key, "methods"], initStore),
      ...(0, _util.get)([key, "reducers"], initStore),
      ...(0, _util.get)([key, "effects"], initStore)
    };
    const methodsArr = methods && Object.keys(methods);
    (0, _is.default)(Array, methodsArr) && methodsArr.forEach(item => {
      if ((0, _util.isAsyncFunction)(methods[item]) || (0, _util.inWhich)("effects", initStore[key], item)) {
        _methods[item] = async payload => {
          await dispatch(methods[item], payload, key);
        };
      }
      if (!(0, _util.isAsyncFunction)(methods[item]) && (0, _is.default)(Function, methods[item])) {
        _methods[item] = payload => {
          dispatch({
            key: key,
            type: item,
            payload
          });
        };
      }
    });
    _store[key] = {
      ...state[key],
      ..._methods
    };
  });
  return _store;
}

/**
 * 添加属性和方法到组件中
 * @param {*} mapStateToProps state状态值
 * @param {*} mapDispatchToProps dispatch方法
 * @returns
 */
function connect(mapStateToProps, mapDispatchToProps) {
  return function (Comp) {
    return function (props) {
      const store = useStoreHook();
      const {
        state
      } = (0, _react.useContext)(StoreContext);
      const rootState = state;
      let methods = {};
      Object.keys(store).forEach(item => {
        // const _state = rootState[item]
        methods[item] = {};
        Object.keys(store[item]).forEach(i => {
          if ((0, _is.default)(Function, store[item][i])) {
            if ((0, _util.isAsyncFunction)(store[item][i]) || (0, _util.inWhich)("effects", initStore[item], i)) {
              methods[item][i] = function (dispatch, state, payload) {
                return new Promise(async (resolve, reject) => {
                  try {
                    await store[item][i](dispatch, rootState, payload);
                    resolve(newData);
                  } catch (err) {
                    reject(err);
                  }
                });
              };
            } else {
              methods[item][i] = function (state, payload) {
                return new Promise((resolve, reject) => {
                  try {
                    store[item][i](state, payload);
                    resolve(state);
                  } catch (err) {
                    reject(err);
                  }
                });
              };
            }
          }
        });
      });
      const stateToProps = mapStateToProps(state);
      const dispatchToProps = mapDispatchToProps(methods);
      return /*#__PURE__*/_react.default.createElement(Comp, (0, _extends2.default)({}, stateToProps, dispatchToProps, props));
    };
  };
}