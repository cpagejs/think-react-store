import React from 'react';
import { history } from 'umi';
import styles from './index.less';
import Demo from '../coms/Demo';

export default () => {
  const handleClick = () => {
    history.push('/user');
  };
  return (
    <>
      <h1 className={styles.title}>think-react-store</h1>
      <button className="user" onClick={handleClick}>user 页面</button>
      <Demo />
    </>
  );
}
