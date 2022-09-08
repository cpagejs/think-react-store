(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*******************************!*\
  !*** external "ramda/src/is" ***!
  \*******************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("ramda/src/is");

/***/ }),
/* 1 */
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/*! exports used: default, useContext, useReducer */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 2 */
/*!*************************************************!*\
  !*** external "@babel/runtime/helpers/extends" ***!
  \*************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/extends");

/***/ }),
/* 3 */
/*!*********************************!*\
  !*** external "ramda/src/path" ***!
  \*********************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("ramda/src/path");

/***/ }),
/* 4 */
/*!************************************!*\
  !*** external "ramda/src/isEmpty" ***!
  \************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("ramda/src/isEmpty");

/***/ }),
/* 5 */
/*!**********************************!*\
  !*** ./src/index.js + 1 modules ***!
  \**********************************/
/*! exports provided: StoreContext, StoreProvider, useStateHook, useDispatchHook, useStoreHook, connect */
/*! all exports used */
/*! ModuleConcatenation bailout: Cannot concat with external "@babel/runtime/helpers/extends" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "ramda/src/is" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "ramda/src/isEmpty" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "ramda/src/path" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "react" (<- Module is not an ECMAScript module) */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "StoreContext", function() { return /* binding */ StoreContext; });
__webpack_require__.d(__webpack_exports__, "StoreProvider", function() { return /* binding */ StoreProvider; });
__webpack_require__.d(__webpack_exports__, "useStateHook", function() { return /* binding */ useStateHook; });
__webpack_require__.d(__webpack_exports__, "useDispatchHook", function() { return /* binding */ useDispatchHook; });
__webpack_require__.d(__webpack_exports__, "useStoreHook", function() { return /* binding */ useStoreHook; });
__webpack_require__.d(__webpack_exports__, "connect", function() { return /* binding */ connect; });

// EXTERNAL MODULE: external "@babel/runtime/helpers/extends"
var extends_ = __webpack_require__(2);
var extends_default = /*#__PURE__*/__webpack_require__.n(extends_);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(1);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "ramda/src/is"
var is_ = __webpack_require__(0);
var is_default = /*#__PURE__*/__webpack_require__.n(is_);

// EXTERNAL MODULE: external "ramda/src/path"
var path_ = __webpack_require__(3);
var path_default = /*#__PURE__*/__webpack_require__.n(path_);

// CONCATENATED MODULE: ./src/util.js


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
function isAsyncFunction(cb) {
  if (!cb) {
    return false;
  }

  return cb.constructor.name === 'AsyncFunction';
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
// EXTERNAL MODULE: external "ramda/src/isEmpty"
var isEmpty_ = __webpack_require__(4);
var isEmpty_default = /*#__PURE__*/__webpack_require__.n(isEmpty_);

// CONCATENATED MODULE: ./src/index.js





const StoreContext = /*#__PURE__*/external_react_default.a.createContext();
const LOADING = 'hook-loading-clear';
let initialState = {},
    initStore = {},
    //传入的store
asyncKey,
    newData,
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

  return { ...state,
    [_key]: { ...state[_key],
      ...doRun(_key, ['methods', 'reducers', 'effects'], type, initStore, state[_key], payload)
    }
  };
}

function StoreProvider(props) {
  var _middleware$filter, _props$cache;

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

  const hasLoadingMiddleware = middleware === null || middleware === void 0 ? void 0 : (_middleware$filter = middleware.filter(item => item.name === 'loading')) === null || _middleware$filter === void 0 ? void 0 : _middleware$filter.length;
  const propsCacheExit = props === null || props === void 0 ? void 0 : (_props$cache = props.cache) === null || _props$cache === void 0 ? void 0 : _props$cache.length;

  if (hasLoadingMiddleware) {
    function setLoadingTrue() {
      if (isEmpty_default()(methodsName)) {
        Object.keys(store).forEach(item => {
          methodsName[item] = { ...transBool(get([item, 'methods'], store), false),
            ...transBool(get([item, 'reducers'], store), false),
            ...transBool(get([item, 'effects'], store), false)
          };
        });
      }
    }

    setLoadingTrue();
  }

  initStore = store; // 中间件

  function middlewareReducer(prevState, action) {
    if (!action) {
      return store;
    }

    if (middleware) {
      if (!is_default()(Array, middleware)) {
        throw new Error('middleware中间件必须为数组');
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
    initialState[item] = initStore[item]['state'];
  });

  if (hasLoadingMiddleware && !initialState['loading']) {
    initialState['loading'] = methodsName;
  }

  let [state, origin_dispatch] = Object(external_react_["useReducer"])(middlewareReducer, initialState);

  const dispatch = async (action, payload, key) => {
    actionAsync = undefined;

    if (get([asyncKey, 'reducers', action.type], initStore)) {
      return origin_dispatch(action);
    }

    if (!isAsyncFunction(action) && inWhich('effects', initStore[action.key || asyncKey], action.type)) {
      asyncKey = action.key;
      actionAsync = action.type;

      if (hasLoadingMiddleware) {
        origin_dispatch({
          key: asyncKey,
          type: LOADING,
          payload: actionAsync
        });
      }

      const func = get([action.key, 'effects', action.type], initStore);
      return await func(origin_dispatch, state, action.payload);
    }

    if (isAsyncFunction(action) || get([asyncKey, 'effects', action], initStore)) {
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
        const _action = get([action().key, 'methods', action().type], initStore) || get([action().key, 'effects', action().type], initStore);

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

  return /*#__PURE__*/external_react_default.a.createElement(StoreContext.Provider, {
    value: {
      state,
      dispatch
    }
  }, props.children);
}

;

function useDispatchHook(key) {
  const store = Object(external_react_["useContext"])(StoreContext);

  if (key) {
    asyncKey = key;
  }

  return store.dispatch;
}

function useStateHook(key) {
  const store = Object(external_react_["useContext"])(StoreContext);
  return key ? get(['state', key], store) : get(['state'], store);
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
  } = Object(external_react_["useContext"])(StoreContext);
  let _store = {};
  Object.keys(state).forEach(key => {
    let _methods = {};
    const methods = { ...get([key, 'methods'], initStore),
      ...get([key, 'reducers'], initStore),
      ...get([key, 'effects'], initStore)
    };
    const methodsArr = methods && Object.keys(methods);
    is_default()(Array, methodsArr) && methodsArr.forEach(item => {
      if (isAsyncFunction(methods[item]) || inWhich('effects', initStore[key], item)) {
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
    _store[key] = { ...state[key],
      ..._methods
    };
  });
  return _store;
}

function connect(mapStateToProps, mapDispatchToProps) {
  return function (Comp) {
    return function (props) {
      const store = useStoreHook();
      const {
        state
      } = Object(external_react_["useContext"])(StoreContext);
      const rootState = state;
      let methods = {};
      Object.keys(store).forEach(item => {
        // const _state = rootState[item]
        methods[item] = {};
        Object.keys(store[item]).forEach(i => {
          if (is_default()(Function, store[item][i])) {
            if (isAsyncFunction(store[item][i]) || inWhich('effects', initStore[item], i)) {
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
      return /*#__PURE__*/external_react_default.a.createElement(Comp, extends_default()({}, stateToProps, dispatchToProps, props));
    };
  };
}



/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map