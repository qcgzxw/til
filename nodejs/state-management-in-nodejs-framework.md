## 前端框架状态管理必要性
对于复杂的项目需要考虑使用状态管理攻击，方便协同，代码可读；如果页面只涉及数据展示，可以不考虑使用状态管理框架。
## React 状态管理
### react.Context
<details>
<summary>最小实现</summary>

```js
import React, { createContext, useContext, useState } from 'react';

const CountContext = createContext();

function CountProvider({ children }) {
  const [count, setCount] = useState(0);
  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
}

function Counter() {
  const { count, setCount } = useContext(CountContext);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

function App() {
  return (
    <CountProvider>
      <Counter />
    </CountProvider>
  );
}

export default App;

```

</details>

### Redux

<https://redux.js.org/tutorials/index>
<details>
<summary>最小实现</summary>

```js
import { createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';

const initialState = { count: 0 };

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    default:
      return state;
  }
}

const store = createStore(reducer);

function Counter() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

export default App;

```

</details>



### zustand

<https://github.com/pmndrs/zustand>

<details>
<summary>最小实现</summary>

```js
import { create } from 'zustand'

const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
```
```js
function BearCounter() {
  const bears = useBearStore((state) => state.bears)
  return <h1>{bears} around here ...</h1>
}

function Controls() {
  const increasePopulation = useBearStore((state) => state.increasePopulation)
  return <button onClick={increasePopulation}>one up</button>
}
```

</details>

## Vue 状态管理
### Vuex

<https://vuex.vuejs.org/zh/>


<details>
<summary>最小实现</summary>

```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  actions: {
    increment(context) {
      context.commit('increment');
    }
  },
  getters: {
    count(state) {
      return state.count;
    }
  }
});

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});

```

</details>


### Pinia

<https://pinia.vuejs.org/zh/>


<details>
<summary>最小实现</summary>

```js
import { createPinia, defineStore } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';

const pinia = createPinia();

const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  actions: {
    increment() {
      this.count++;
    }
  },
  getters: {
    doubleCount: (state) => state.count * 2
  }
});

const app = createApp(App);
app.use(pinia);
app.mount('#app');

```

</details>



