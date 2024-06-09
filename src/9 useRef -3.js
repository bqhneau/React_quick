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