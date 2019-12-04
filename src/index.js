import React, { useContext, useReducer } from 'react'
import is from 'ramda/src/is'
import clone from 'ramda/src/clone'
import isEmpty from 'ramda/src/isEmpty'
import { get, run, isAsyncFunction, inWhich, transBool } from './util'

const StoreContext = React.createContext()

const LOADING = 'hook-loading-clear'

let initialState = {},
  initStore = {}, //传入的store
  asyncKey,
  newData,
  methodsName = {}, //所有方法名
  actionAsync //触发的异步方法

function doRun(key, actionArr, type, store, state, payload) {
  let res
  actionArr.forEach(item => {
    if (get([key, item, type], store)) {
      res = run([key, item, type], store, state, payload)
    }
  })
  newData = res
  return res
}

function reducer(state, action) {
  const { key, type, payload } = action
  const _key = key || asyncKey

  return {
    ...state,
    [_key]: {
      ...state[_key],
      ...doRun(_key, ['methods', 'reducers', 'effects'], type, initStore, state[_key], payload)
    }
  }
}

function StoreProvider(props) {
  const {store, middleware} = props;
  if(!store){
    console.error(`
      store 必须有值，类似于：
      <StoreProvider store={store}>
      `)
    return null
  }

  function setLoadingTrue() {
    if(isEmpty(methodsName)){
      Object.keys(store).forEach(item => {
        methodsName[item] = {
          ...transBool(get([item, 'methods'], store), false),
          ...transBool(get([item, 'reducers'], store), false),
          ...transBool(get([item, 'effects'], store), false)
        }
      })
    }
  }
  setLoadingTrue()
  
  initStore = store
  
  // 中间件
  function middlewareReducer(prevState, action){
    if (!action) {
      return store;
    }
    
    let nextState = reducer(prevState, action);
    
    if(middleware){
      if(!is(Array, middleware)){
        throw new Error('middleware中间件必须为数组')
      }
    }
    middleware && middleware.forEach(item=>{
      const newState = item(store, prevState, nextState, action, actionAsync, asyncKey)
      if(newState){
        nextState = newState
      }
    })

    return nextState;
  }

  Object.keys(initStore).forEach(item => {
    initialState[item] = initStore[item]['state']
  })
  initialState['loading'] = methodsName

  const [state, origin_dispatch] = useReducer(middlewareReducer, initialState)
  let _state = clone(state)

  const dispatch = async (action, payload, key) => {
    actionAsync = undefined

    if (get([asyncKey, 'reducers', action.type], initStore)) {
      return origin_dispatch(action);
    }

    if(!isAsyncFunction(action) && inWhich('effects', initStore[asyncKey ||  action.key], action.type)){
      asyncKey = action.key
      actionAsync = action.type
	  origin_dispatch({
        key: asyncKey,
        type: LOADING,
        payload: actionAsync
      })
      const func = get([action.key, 'effects', action.type], initStore)
      return await func(origin_dispatch, _state, action.payload)
    }

    if (isAsyncFunction(action) || get([asyncKey, 'effects', action], initStore)) {
      asyncKey = key
      actionAsync = action.name
      origin_dispatch({
        key: asyncKey,
        type: LOADING,
        payload: action.name,
      })
      return await action(origin_dispatch, state, payload);
    }

    if (!isAsyncFunction(action) && is(Function, action)) {
      if (is(Object, action())) {
        const _action = get([action().key, 'methods', action().type], initStore) ||
          get([action().key, 'effects', action().type], initStore)

        if (is(Function, _action)) {
          asyncKey = action().key
          actionAsync = action().type
		  origin_dispatch({
			key: asyncKey,
			type: LOADING,
			payload: actionAsync
		  })
          return await _action(origin_dispatch, state, action().payload);
        }
      }
    }

    return origin_dispatch(action);
  }
  
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
};

function useDispatchHook(key) {
  const store = useContext(StoreContext)
  if (key) {
    asyncKey = key
  }
  return store.dispatch
}

function useStateHook(key) {
  const store = useContext(StoreContext)

  return key ? get(['state', key], store) : get(['state'], store)
}

/*返回state和方法
{
  user: {id:1,getUser(state,payload){xxxx}}
}
*/
function useStoreHook() {
  const { state, dispatch } = useContext(StoreContext)
  let _store = {}
  Object.keys(state).forEach(key => {
    let _methods = {}
    const methods = {
      ...get([key, 'methods'], initStore),
      ...get([key, 'reducers'], initStore),
      ...get([key, 'effects'], initStore)
    }
    const methodsArr = methods && Object.keys(methods)

    is(Array, methodsArr) && methodsArr.forEach(item => {
      if (isAsyncFunction(methods[item]) || inWhich('effects', initStore[key], item)) {
        _methods[item] = async (payload) => {
          await dispatch(methods[item], payload, key)
        }
      }

      if (!isAsyncFunction(methods[item]) && is(Function, methods[item])) {
        _methods[item] = (payload) => {
          dispatch({
            key: key,
            type: item,
            payload
          })
        }
      }
    })
    
    _store[key] = {
      ...state[key],
      ..._methods
    }
  })

  return _store
}

function connect(mapStateToProps, mapDispatchToProps){
  return function(Comp){
    return function(props){
      const store = useStoreHook()
      const { state } = useContext(StoreContext)
      const rootState = state
      let methods = {}
      Object.keys(store).forEach(item=>{
        // const _state = rootState[item]
        methods[item] = {}
        Object.keys(store[item]).forEach(i=>{
          if(is(Function, store[item][i])){
            if(isAsyncFunction(store[item][i]) || inWhich('effects', initStore[item], i)){
              methods[item][i] = function(dispatch, state, payload){
                return new Promise(async (resolve, reject)=>{
                  try{
                    await store[item][i](dispatch, rootState, payload)
                    resolve(newData)
                  }catch(err){
                    reject(err)
                  }
                })
              }
            }else {
              methods[item][i] = function(state, payload){
                return new Promise((resolve, reject)=>{
                  try{
                    store[item][i](state, payload)
                    resolve(state)
                  }catch(err){
                    reject(err)
                  }
                })
              }
            }
          }
        })
      })

      const stateToProps = mapStateToProps(state)
      const dispatchToProps = mapDispatchToProps(methods)

      return <Comp {...stateToProps} {...dispatchToProps} {...props}/>
    }
  }
}

export {
  StoreContext, StoreProvider, useStateHook, useDispatchHook, useStoreHook, connect
}
