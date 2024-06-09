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