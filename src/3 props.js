
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
