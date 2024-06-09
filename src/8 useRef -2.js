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