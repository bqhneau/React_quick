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

## 8、状态处理(useState)
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