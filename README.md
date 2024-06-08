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

## 10、组件通信(多级)
