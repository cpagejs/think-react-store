import React from 'react';
import { connect } from '../src/index';

function DemoConnect(props){
  // console.log(props)
  
  const handelClick = ()=>{
    // console.log(props.loading)
    props.getUser({
      id: 456
    })
    .then(res=>{
      console.log(res)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const handelClickAsync = ()=>{
    props.setNameAsync({
      id: 789
    })
    .then(res=>{
      console.log('handelClickAsync',res)
    })
  }

  return (
    <div>
      <h1>connect---</h1>
      <p>loading-getUser->{props?.loading?.user?.getUser ? <span>true</span> : <span>false</span>}</p>
      <p>loading-setNameAsync->{props?.loading?.user?.setNameAsync ? <span>true</span> : <span>false</span>}</p>
      <p>id: {props.id}</p>
      <p>name: {props.name}</p>
      <button onClick={handelClick}>修改</button>
      <button onClick={handelClickAsync}>异步修改</button>
    </div>
  )
}

const mapState = ({user:{id, name}, loading}) => ({
  id,
  name,
  loading
});
const mapDispatch = ({user:{getUser, getAuth, setNameAsync}}) => ({
  getUser,
  getAuth, setNameAsync
})
export default connect(mapState, mapDispatch)(DemoConnect)