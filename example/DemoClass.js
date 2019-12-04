import React from "react";
import { StoreContext } from '../src';

export default class DemoClass extends React.Component {
  static contextType = StoreContext;

  handleAuth = ()=>{
    this.context.dispatch({
      key: 'user',
      type: 'getUser',
      payload: {
        name: '同步数据'
      }
    })
  }

  handleAuthAsync = ()=>{
    this.context.dispatch(()=>({
      key: 'user',
      type: 'getAuth',
      payload: {
        name: '异步数据'
      }
    }))
  }

  async demo(){}

  componentDidMount(){
    // console.log(this.demo)
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
