## 1、创建项目
```
    npx create-react-app myReact
```

## 2、启动项目
```
    cd myReact
    npm start
```

## 3、jsx语法
```
    1、只能有一个根标签/<></>
    2、所有标签必须闭合
    3、jsx语法要写在小括号()里面 !!!
```

## 4、插值 { }
```
    1、插值可以使用的位置
        标签内容
        标签属性
    2、{ }里面为js语句

```
```js
【代码】
function App() {
  const divContent = '我是标签内容';
  const divTitle = '我是标签标题';
  return (
    <div title={divTitle}> { divContent }</div>
  );
}

export default App;
```

## 5、条件渲染
```
    根据js手写逻辑
```
```js
【情况一】
function App() {
  let divContent = null;
  const divTitle = '我是标签标题';

  const flag = true;
  if (flag) {
    divContent = <span>span</span>
  } else {
    divContent = <p>p</p>
  }
  return (
    <div title={divTitle}> { divContent }</div>
  );
}

export default App;

【情况二】
import { Fragment } from "react";

function App() {
  const list = ['张三', '李四', '王五']
  
  const li = list.map((item, index) => (
    // 1、空标签中是不能加key的
    // <  key= { index }>
    //   <li >{item}</li>
    //   <li>------</li>
    // </>

    // 2、使用 react 提供的 Fragment
    <Fragment key={index}>
      <li >{item}</li>
      <li>------</li>
    </Fragment>
  ))
  return (
    <ul>{ li }</ul>
  );
}

export default App;

```

## 6、列表渲染
```
    一样是通过数组方法map或者foreach等方法自己循环
```
```js
function App() {
  const list = ['张三', '李四', '王五']
  // 这里一定要用()
  const li = list.map((item,index) => (
    <li key={index}>{item}</li>
  ))
  return (
    <ul>{ li }</ul>
  );
}

export default App;

```

## 7、事件绑定
```
  函数组件中无this
```
```js
function App() {
  function handleClick(e){
    console.log('点击了按钮',e);
  }
  return (
   <button onClick={handleClick}>按钮</button>
  );
}

export default App;
```

## 8、useState
### 8.1 基本使用
```js
import {useState} from 'react'

function App() {
  function handleClick(){
   setContent('已更改')
  }

  const [content, setContent] = useState('默认内容')
  return (
    <>
      <div>{content}</div>
      <button onClick={handleClick}>按钮</button>
    </>
  );
}

export default App;
```

### 8.2 对象一些细节
    useState修改值是覆盖，不是追加
    所以更改对象时，应该先解构，再追加
```js
import {useState} from 'react'

function App() {
  function handleClick() {
    // useState修改值是覆盖，不是追加
    setContent({
      ...content,
      content:'新内容'
   })
  }

  const [content, setContent] = useState({
    title: '标题',
    content:'内容'
  })
  return (
    <>
      <div title={ content.title}>{content.content}</div>
      <button onClick={handleClick}>按钮</button>
    </>
  );
}
export default App;

```

### 8.3 数组的一些细节
```js
import { useState } from 'react'

function App() {
  const [data, setData] = useState([
    { id: 1, name: 'zhangsan' },
    { id: 2, name: 'lisi' },
    { id: 3, name: 'wangwu' },
  ])

  const list = data.map(item => (
    <li key={item.id}> { item.name }</li>
  ))

  function handleClick() {
    // useState修改值是覆盖，不是追加
    setData([
      ...data,
      {id:4,name:'111'}
    ])
  }
  return (
    <>
      <ul>{ list}</ul>
      <button onClick={handleClick}>按钮</button>
    </>
  );
}

export default App;
```

## 9、组件通信(父=>子)

### 9.1 为组件设置props
```
    1、className = '' 
    2、style = { { } }
      (1) 内联式：内部直接写
      (2) 外链式：使用变量
      (3) jsx展开语法，直接将所有的属性结构放在元素(不同于es6)
```

### 9.2 props 传值基本使用
```
    1、函数接收第一个参数为props 
    2、从中解构出标题和内容，方便后续使用
```
```js
function Article( {title,content,active}) {
  return (
    <div>
      <h3>{ title }</h3>
      <p>{content}</p>
      <p>{ active?'显示':'隐藏'} </p>
    </div>
  )
}

function App() {
  
  return (
    <>
      <Article title='标题1' content='内容1' active />
      <Article title='标题2' content='内容2' />
      <Article title='标题3' content='内容3' active />
    </>
  );
}

export default App;
```

### 9.3 插槽
```
    1、react中的插槽本质上就是props中的一个属性【children】
    2、父组件通过props向子组件传递html解构，子组件从【props的children】中取出
```
```js

function List( {children} ) {
  return (
    <ul>{children}</ul>
  )
}

function App() {
  
  return (
    <>
      <List>
        <li>内容</li>
        <li>内容</li>
        <li>内容</li>
      </List>
    </>
  );
}

export default App;
```

## 10、组件通信(子=>父)
```
    1、父组件向子组件传递一个方法
    2、子组件接收该方法
    3、子组件在合适的时机调用并传参
    4、父组件拿到子组件的数据
```
```js
import { useState } from "react";

// 2、子组件接收该方法
function Detail( {onActice}) {

  const [status,setStatus] = useState(false)
  const handleClick = () => {
    setStatus(!status)
    // 3、在合适的时机调用并传参
    onActice(status)
  }
  return (
    <>
      <button onClick={handleClick}> 点我切换</button>
      <span style={{ 
        display: status ? 'block' : 'none'
       }}>Detail的内容</span>
    </>
  )
}

function App() {
  // 4、父组件拿到子组件的数据
  const handle = (status) => {
    console.log(status);
  }
  return (
    // 1、向子组件传递一个方法
    <Detail onActice={ handle } />
  );
}

export default App;
```

## 11、useReducer
```
    1、相较于 useState 更高效
    2、语法：[状态，分发方法] = useReducer(处理函数，初始值)
    const [state, dispatch] = useReducer(countReducer, 0)
```
```js
import {useReducer} from 'react'
// 1、声明处理函数
function countReducer(state,actions) {
  switch (actions.type) {
    case 'add': 
      return state +1
    case 'dec':
      return state - 1
    default:
      throw new Error()
  }
}
function App() {
  // [状态，分发方法] = useReducer(处理函数，初始值)
  // 2、使用useReducer
  const [state, dispatch] = useReducer(countReducer, 0)
  const add = () => dispatch({type:'add'})
  const dec = () => dispatch({type:'dec'})
  return (
    <div style={{margin:'20px'}}>
      <button onClick={dec}>-</button>
      <span>{state}</span>
      <button onClick={add}>+</button>
    </div>
  )
}
export default App
```

## 12、useRef
```
  1、用来引用之前的值
  2、用来获取标签
  3、用来获取子组件以及子组件身上的方法
```

### 12.1 用来引用之前的值
```js
import {useState,useRef} from 'react'

function App() {

  const [count, setCount] = useState(0)
  // 1、定义表示变量
  const pre = useRef()

  const add = () => {
    // 2、使用 useRef 获取最新的值 
    pre.current = count;
    setCount( count+1 ) 
  }
  
  return (
    <div style={{margin:'20px'}}>
      <p>最新的count：{ count }</p>
      <p>上次的count：{ pre.current}</p>
      <button onClick={add}>增加count</button>
    </div>
  )
}

export default App
```

### 12.2 用来获取标签
```js
import { useRef } from 'react'

function App() {

  // 1、定义表示变量
  const input = useRef()

  const add = () => {
    // 3、使用 useRef 获取更新input的值 
    input.current.value = 1
  }
  
  return (
    <div style={{ margin: '20px' }}>
      {/* 2、绑定关联 */}
      <input type="text" ref={input} />
      <button onClick={add}>按钮</button>
    </div>
  )
}

export default App
```

### 12.3 用来获取子组件以及子组件身上的方法
```
    1、函数组件不是实例，所以无法直接获取子组件甚至其身上的方法
    2、可以借助 forwardRef useImperativeHandle 获取
```
```js
import { useRef,forwardRef,useImperativeHandle } from 'react'

// 2、使用 forwardRef 暴露组件
const Child = forwardRef(function (props, ref) {
  // 3、使用 useImperativeHandle 暴露函数
  useImperativeHandle(ref, () => ({
    myFn: () => {
      console.log('子组件的方法');
    }
  }))

  return (
    <h3>child</h3>
  )
})

function App() {

  // 1、定义表示变量
  const child = useRef()

  // 4、获取到子组件的方法
  const getSon = () => {
    console.log(child.current);
    child.current.myFn()
  }

  return (
    <div >
      <h2>father</h2>
      <Child ref={child} />
      <button onClick={getSon}>获取子组件</button>
    </div>
  )
}

export default App
```

## 13、useEffect
```
    (1). Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
    (2). React中的副作用操作:
            发ajax请求数据获取
            设置订阅 / 启动定时器
            手动更改真实DOM
    (3). 语法和说明: 
            useEffect(() => { 
              // 在此可以执行任何带副作用操作
              return () => { // 在组件卸载前执行
                // 在此做一些收尾工作, 比如清除定时器/取消订阅等
              }
            }, [stateValue]) // 如果指定的是[], 回调函数只会在第一次render()后执行
        
    (4). 可以把 useEffect Hook 看做如下三个函数的组合
            componentDidMount()
            componentDidUpdate()
            componentWillUnmount() 
```

```js
// 1、相当于 componentDidMount
  useEffect(() => {
    console.log('componentDidMount');
  }, [])
  
  // 2、相当于  componentDidUpdate
  useEffect(() => {
    console.log(' componentDidUpdate');
  }, [state])

  // 3、相当于 componentWillUnmount
  useEffect(() => {
    return () => {
      console.log('componentWillUnmount');
    }
  }, [state])

  // 4、componentWillUnmount 简写
  useEffect(() => () => {
      console.log('componentWillUnmount');
  }, [state])
```

## 14、useMemo 与 useCallback
```
    1、都用于【函数组件性能优化】，主要就是一个【缓存】
    2、useMemo 用来缓存【数据】 可以填依赖项
    3、useCallback 用来缓存【函数】 可以填依赖项
    4、类似于vue的【计算属性】
```