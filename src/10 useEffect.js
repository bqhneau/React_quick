import { useState,useEffect } from 'react'



function App() {
  const [state,setState] = useState(0)
  const add = () => setState(state + 1)
  const dec = () => setState(state - 1)

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

  return (
    <div style={{ margin: '20px' }}>
      <button onClick={dec}>-</button>
      <span>{state}</span>
      <button onClick={add}>+</button>
    </div>
  )
}

export default App