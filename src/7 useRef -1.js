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