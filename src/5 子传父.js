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
