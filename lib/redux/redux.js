import React, { useContext, useEffect, useState } from 'react';

const appContext = React.createContext(null);
const store = {
  state: {
    user: { name: 'frank', age: 18 },
    group: { name: '前端组' }
  },
  setState(newState) {
    store.state = newState;
    store.listeners.map(fn => fn(newState));
  },
 listeners: [],
  subscribe(fn) {
    store.listeners.push(fn);
    return () => {
      const index = store.listener.indexOf(fn);
      store.listener.splice(index, 1);
    };
  }
};
const connect = selector => Components => {
  return props => {
    const { state, setState, subscribe } = useContext(appContext);
    const [, update] = useState({});
    const data = selector ? selector(state) : { state };
    const dispatch = action => {
      setState(reducer(state, action));
    };
    useEffect(() => {
      subscribe(update);
    }, []);
    return (
      <Components
        setState={setState}
        dispatch={dispatch}
        {...data}
        {...props}
      />
    );
  };
};
const reducer = (state, { type, payload }) => {
  if (type === 'updateUser') {
    return {
      ...state,
      user: {
        ...state.user,
        ...payload
      }
    };
  }
};
export { store, connect, reducer, appContext };
