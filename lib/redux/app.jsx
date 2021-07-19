import React, { useState, useEffect, useContext } from 'react';
import './style.css';
import { store, connect, reducerappContext, appContext } from './redux.js';

export default function App() {
  return (
    <appContext.Provider value={store}>
      <大儿子 />
      <二儿子 />
      <幺儿子 />
    </appContext.Provider>
  );
}
const 大儿子 = () => (
  <section>
    大儿子
    <User />
  </section>
);
const 二儿子 = () => (
  <section>
    二儿子
    <UserModifier />
  </section>
);
const 幺儿子 = connect(state => {
  return {
    group: state.group
  };
})(props => {
  console.log('小儿子')
  return (
    <section>
      <div>{props.group.name}</div>幺儿子
    </section>
  );
});
const User = connect(state => {
  return {
    user: state.user
  };
})(props => {
  return <div>User:{props.user.name}</div>;
});

const UserModifier = connect()(props => {
  const onChange = e => {
    props.dispatch({
      type: 'updateUser',
      payload: {
        name: e.target.value
      }
    });
  };
  return (
    <div>
      <input value={props.state?.user?.name} onChange={onChange} />
    </div>
  );
});
