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
