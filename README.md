# @cpage/react-store
[@cpage/react-store](https://github.com/cpagejs/react-store) 基于 react hooks 和 context api 实现的类似的 redux 的数据管理库。支持数据存储，方法调用，可以在 class 组件和 function 组件中使用，支持同步和异步的方法调用。

[GitHub 仓库地址](https://github.com/cpagejs/react-store)

## 安装
```
npm i --save @cpage/react-store
```

## api 介绍  

| api | 作用 | 适合场景 |  
| --- | --- | --- |  
| StoreProvider | 全局用的 provider | app.js 或者单个模块的根文件 |  
| StoreContext | 存储用的 Context | function 组件和 class 组件均适用 |  
| useStoreHook | store 钩子函数，包含state和dispatch | function 组件 |  
| useStateHook | 获取 state 用的 hook | function 组件 |  
| useDispatchHook | 进行事件派发的 hook | function 组件 |  
| connect | 添加属性和方法到组件中 | function/class 组件 |  

备注：
 - 参数 key 指的是，各个 context 导出时候对应的值，例如 `export { default as user } from './user'`，那么 key 就是 user
 - 如果报语法错误，在检查原因后安装 babel 相关插件，例如 @babel/preset-react；另外建议不用 @babel/preset-env，因为 preset-env 会在运行时将 async/await 等进行转译；如果一定要使用，可以配置 targets 属性，类似这样子
```
"presets": [
  ["@babel/preset-env", {
    "targets": {
      "chrome": "70"
    },
    useBuiltIns: "usage"
  }],
  "@babel/preset-react"
],
```

## 1，创建 context

| 属性 | 含义 |  
| --- | --- |  
| state | state 属性 |  
| methods | 方法，支持同步和异步两种写法，异步写法需要使用 async |  
| reducers | 支持同步方法 |  
| effects | 支持异步方法，需要使用 async |  

```
// 创建 Contexts 目录

// user.js
export default {
  state: {
    id: 123,
    name: 'cc'
  },
  reducers: {
    setName(state, payload){
      return {
        ...state,
        ...payload
      }
    }
  },
  effects: {
    async setNameAsync(dispatch, state, payload){
      await new Promise(resolve=>setTimeout(resolve,1000))
      dispatch({
        type: 'setName',
        payload
      })
    }
  }
}

// index.js 合并 context
export { default as user } from './user'
```

## 2，配置 StoreProvider
```
import { StoreProvider } from '@cpage/react-store';
import * as store from './Contexts';

ReactDOM.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
mountNode);
```

## 3，使用 connect (推荐)
备注：使用 connect 绑定的方法返回一个 promise 对象
```
const mapState = ({user:{id, name}}) => ({
  id,
  name
});
const mapDispatch = ({user:{setName, setNameAsync}}) => ({
  setName,
  setNameAsync
})
export default connect(mapState, mapDispatch)(DemoConnect)

// 使用
const handelClick = ()=>{
  props.setName({
    name: 'john'
  })
  .then(res=>{
    console.log(res)
  })
  .catch(err=>{
    console.log(err)
  })
}
```

## 4，在 function 组件中使用
```
import React, { useContext } from "react";
import { StoreContext, useStoreHook } from '@cpage/react-store';

export default function DemoFunc(){
  const {state, dispatch} = useContext(StoreContext)
  const {user:{id, name, setName, setNameAsync}} = useStoreHook()

  const handleName = ()=>{
    setName({
      name: '同步修改'
    })
  }

  const handleNameAsync = ()=>{
    setNameAsync({
      name: '异步修改'
    })
  }

  return (
    <div>
      <h1>function 类型组件</h1>
      <p>用户：name--{name}   id--{state.user.id}</p>
      <p><button onClick={handleName}>修改用户</button></p>
      <p><button onClick={handleNameAsync}>异步修改用户</button></p>
    </div>
  )
}
```
备注：function 组件中使用 @cpage/react-store ，有多种调用方法。

### 4.1，获取 state 数据
使用 useStoreHook（推荐使用）
```
import React, { useContext } from "react";
import { useStoreHook } from '@cpage/react-store';

const {user:{id, name, setName, setNameAsync}} = useStoreHook()

<div>用户：{name}</div>
```

使用 useContext + StoreContext
```
import React, { useContext } from "react";
import { StoreContext } from '@cpage/react-store';

// state 指的是所有 context 的 state
const {state, dispatch} = useContext(StoreContext)

<div>用户：{state.user.id}</div>
```

使用 useStateHook，useStateHook 接受一个参数，如果不传则返回所有 state，传递对应的 key 则返回对应的 state
```
import { useStateHook } from '@cpage/react-store';

// 获取所有的
const states = useStateHook()

// 获取单个的
const userState = useStateHook('user')
```

### 4.2，使用 dispatch
使用 useStoreHook（推荐使用），同步和异步的调用方式一样，只需要传递参数即可
```
import { useStoreHook } from '@cpage/react-store';

const {user:{id, name, setName, setNameAsync}} = useStoreHook()

getUser({
  name: '异步修改'
})
```

使用 useContext + StoreContext，如果是异步调用参数需要为函数
```
import React, { useContext } from "react";
import { StoreContext } from '@cpage/react-store';

// state 指的是所有 context 的 state
const {state, dispatch} = useContext(StoreContext)

// 同步
dispatch({
  key: 'user',
  type: 'setName',
  payload: {
    name: '同步数据'
  }
})

// 异步
dispatch(()=>({
  key: 'user',
  type: 'setNameAsync',
  payload: {
    name: '异步修改'
  }
}))
```

使用 useDispatchHook，useDispatchHook 接受一个参数，如果不传那么在使用 dispatch 使用需要携带上。如果是异步调用参数需要为函数
```
import { useDispatchHook } from '@cpage/react-store';

// 不带参数 key
const dispatchs = useDispatchHook()
dispatchs({
  key: 'user',
  type: 'setName',
  payload: {
    name: '同步数据'
  }
})

// 参数 key
const dispatchs = useDispatchHook('user')
dispatchs({
  type: 'setName',
  payload: {
    name: '同步数据'
  }
})

// 异步
dispatchs(()=>({
  type: 'setNameAsync',
  payload: {
    name: '异步修改'
  }
}))
```

## 5，在 class 组件中使用
在 class 组件中使用 dispatch 调用异步函数时候，this.context.dispatch 里面的参数是函数；使用 dispatch 调用同步函数时候，this.context.dispatch 里面的参数是函数是 json 对象。
```
import React from "react";
import { StoreContext } from '@cpage/react-store';

export default class DemoClass extends React.Component {
  static contextType = StoreContext;

  handleAuth = ()=>{
    this.context.dispatch({
      key: 'user',
      type: 'setName',
      payload: {
        name: '同步数据'
      }
    })
  }

  handleAuthAsync = ()=>{
    this.context.dispatch(()=>({
      key: 'user',
      type: 'setNameAsync',
      payload: {
        name: '异步数据'
      }
    }))
  }

  render() {
    return <div style={{border: '1px solid #9c9c9c'}}>
      <h1>class 类型组件</h1>
      <p>用户：{this.context.state.user.name}</p>
      <p><button onClick={this.handleAuth}>修改用户</button></p>
      <p><button onClick={this.handleAuthAsync}>异步修改用户</button></p>
    </div>;
  }
}
```

## 6，中间件
### 6.1，新增中间件文件
```
/**
 * 中间件参数
 * @param {Object} store store
 * @param {Object} prevState 更新前的state值
 * @param {Object} nextState 更新后的state值
 * @param {Object} action 派发的action
 */
export default function log(store, prevState, nextState, action){
  console.log('----日志log-----')
  console.log(`修改前：${JSON.stringify(prevState)}`)
  console.log(`修改后：${JSON.stringify(nextState)}`)
}
```

### 6.2，使用中间件
备注：middleware 的类型为数组
```
<StoreProvider store={store} middleware={[log]}>
  
</StoreProvider>
```

## 7，loading
```
// 需要引入loading中间件
import loading from '@cpage/react-store/middlewares/loading'

// 配置
<StoreProvider store={store} middleware={[loading]}>
  
</StoreProvider>

// 使用
const mapState = ({user:{id, name}, loading}) => ({
  id,
  name,
  loading
});

// 一般 loading 只需要异步函数中使用
<p>loading-setNameAsync->{props.loading.user.setNameAsync ? <span>true</span> : <span>false</span>}</p>
```

## 8，使用缓存（将 model 的数据缓存到 localStorage 里面）
```
import cache from '@cpage/react-store/middlewares/cache';

<StoreProvider 
  store={store} 
  middleware={[cache]}
  cache={['user']}
>
    
</StoreProvider>
```
配置 cache 属性，cache 的值为数组，元素是 model 的名称，如果数组为空则不缓存数据。数据被缓存到 localStorage 里面。

ps：如果在使用过程中遇到什么问题/或者有改进的意见，欢迎👏在 [issues](https://github.com/cpagejs/react-store/issues) 里面交流！欢迎🌟！
