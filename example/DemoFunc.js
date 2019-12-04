import React, { useContext } from "react";
import { StoreContext, useStoreHook, useStateHook, useDispatchHook } from '../src';

export default function DemoFunc(){
  const {state, dispatch} = useContext(StoreContext)
  const {user:{id, name, getUser, getAuth, setName}} = useStoreHook()
  const userInfo = useStateHook('user')
  const dispatchs = useDispatchHook('user')

  const handleAuth = ()=>{
    // 方法1
    // getUser({
    //   name: '同步修改'
    // })
    setName({
      id: '456',
      name: '同步修改'
    })

    // 方法2
    // dispatchs({
    //   // key: 'user',
    //   // type: 'getUser',
    //   type: 'setName',
    //   payload: {
    //     name: '同步数据'
    //   }
    // })

    // 方法3
    // dispatch({
    //   key: 'user',
    //   type: 'getUser',
    //   payload: {
    //     name: '同步数据'
    //   }
    // })
  }

  const handleAuthAsync = ()=>{
    // getAuth({
    //   name: '异步修改'
    // })

    dispatchs(()=>({
      key: 'user',
      // type: 'getAuth',
      type: 'setNameAsync',
      payload: {
        name: '异步修改'
      }
    }))
  }

  return (
    <div>
      <h1>function 类型组件</h1>
      <p>用户：name--{name}   id--{state.user.id} --- {userInfo.id}</p>
      <p><button onClick={handleAuth}>修改用户</button></p>
      <p><button onClick={handleAuthAsync}>异步修改用户</button></p>
    </div>
  )
}
