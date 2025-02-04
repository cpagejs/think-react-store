(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************************!*\
  !*** ./src/index.js + 6 modules ***!
  \**********************************/
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  StoreContext: () => (/* binding */ StoreContext),
  StoreProvider: () => (/* binding */ StoreProvider),
  connect: () => (/* binding */ connect),
  useDispatchHook: () => (/* binding */ useDispatchHook),
  useStateHook: () => (/* binding */ useStateHook),
  useStoreHook: () => (/* binding */ useStoreHook)
});

;// external "@babel/runtime/helpers/extends"
const extends_namespaceObject = require("@babel/runtime/helpers/extends");
var extends_default = /*#__PURE__*/__webpack_require__.n(extends_namespaceObject);
;// external "react"
const external_react_namespaceObject = require("react");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_namespaceObject);
;// external "ramda/src/is"
const is_namespaceObject = require("ramda/src/is");
var is_default = /*#__PURE__*/__webpack_require__.n(is_namespaceObject);
;// external "ramda/src/path"
const path_namespaceObject = require("ramda/src/path");
var path_default = /*#__PURE__*/__webpack_require__.n(path_namespaceObject);
;// ./src/util.js


function get(target, source) {
  return path_default()(target, source);
}
function run(target, source, ...args) {
  const res = get(target, source);
  if (is_default()(Function, res)) {
    return res(...args);
  }
  return undefined;
}

// 判断是否是异步函数
function isAsyncFunction(cb) {
  if (!cb) {
    return false;
  }
  return cb.constructor.name === "AsyncFunction";
}

/**
 * 函数是否在effects/reducers/methods里面
 * @param {String} type  methods effects reducers
 * @param {Object} obj
 * @param {String} name
 */
function inWhich(type, obj, name) {
  if (!obj) {
    return false;
  }
  if (!obj[type]) {
    return false;
  }
  if (obj[type][name]) {
    return true;
  }
}
function transBool(obj, flag = true) {
  if (!is_default()(Object, obj)) {
    return {};
  }
  let newObj = {};
  Object.keys(obj).forEach(item => {
    newObj[item] = flag;
  });
  return newObj;
}
;// external "ramda/src/isEmpty"
const isEmpty_namespaceObject = require("ramda/src/isEmpty");
var isEmpty_default = /*#__PURE__*/__webpack_require__.n(isEmpty_namespaceObject);
;// ./src/index.js





const StoreContext = /*#__PURE__*/external_react_default().createContext();
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
    if (get([key, item, type], store)) {
      res = run([key, item, type], store, state, payload);
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
      if (isEmpty_default()(methodsName)) {
        Object.keys(store).forEach(item => {
          methodsName[item] = {
            ...transBool(get([item, "methods"], store), false),
            ...transBool(get([item, "reducers"], store), false),
            ...transBool(get([item, "effects"], store), false)
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
      if (!is_default()(Array, middleware)) {
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
  let [state, origin_dispatch] = (0,external_react_namespaceObject.useReducer)(middlewareReducer, initialState);
  const dispatch = async (action, payload, key) => {
    actionAsync = undefined;
    if (get([asyncKey, "reducers", action.type], initStore)) {
      return origin_dispatch(action);
    }
    if (!isAsyncFunction(action) && inWhich("effects", initStore[action.key || asyncKey], action.type)) {
      asyncKey = action.key;
      actionAsync = action.type;
      if (hasLoadingMiddleware) {
        origin_dispatch({
          key: asyncKey,
          type: LOADING,
          payload: actionAsync
        });
      }
      const func = get([action.key, "effects", action.type], initStore);
      return await func(origin_dispatch, state, action.payload);
    }
    if (isAsyncFunction(action) || get([asyncKey, "effects", action], initStore)) {
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
    if (!isAsyncFunction(action) && is_default()(Function, action)) {
      if (is_default()(Object, action())) {
        const _action = get([action().key, "methods", action().type], initStore) || get([action().key, "effects", action().type], initStore);
        if (is_default()(Function, _action)) {
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
  return /*#__PURE__*/external_react_default().createElement(StoreContext.Provider, {
    value: {
      state,
      dispatch
    }
  }, props.children);
}
function useDispatchHook(key) {
  const store = (0,external_react_namespaceObject.useContext)(StoreContext);
  if (key) {
    asyncKey = key;
  }
  return store.dispatch;
}
function useStateHook(key) {
  const store = (0,external_react_namespaceObject.useContext)(StoreContext);
  return key ? get(["state", key], store) : get(["state"], store);
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
  } = (0,external_react_namespaceObject.useContext)(StoreContext);
  let _store = {};
  Object.keys(state).forEach(key => {
    let _methods = {};
    const methods = {
      ...get([key, "methods"], initStore),
      ...get([key, "reducers"], initStore),
      ...get([key, "effects"], initStore)
    };
    const methodsArr = methods && Object.keys(methods);
    is_default()(Array, methodsArr) && methodsArr.forEach(item => {
      if (isAsyncFunction(methods[item]) || inWhich("effects", initStore[key], item)) {
        _methods[item] = async payload => {
          await dispatch(methods[item], payload, key);
        };
      }
      if (!isAsyncFunction(methods[item]) && is_default()(Function, methods[item])) {
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
      } = (0,external_react_namespaceObject.useContext)(StoreContext);
      const rootState = state;
      let methods = {};
      Object.keys(store).forEach(item => {
        // const _state = rootState[item]
        methods[item] = {};
        Object.keys(store[item]).forEach(i => {
          if (is_default()(Function, store[item][i])) {
            if (isAsyncFunction(store[item][i]) || inWhich("effects", initStore[item], i)) {
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
      return /*#__PURE__*/external_react_default().createElement(Comp, extends_default()({}, stateToProps, dispatchToProps, props));
    };
  };
}

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map