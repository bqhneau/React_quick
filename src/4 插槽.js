
function List( {children,title,footer = <div>默认底部</div>} ) {
  return (
    <>
      <h3>{title}</h3>
      <ul>{children}</ul>
      {footer}
    </>
  )
}

function App() {
  
  return (
    <>
      
      <List
        title='列表1'
        footer={<p>底部1</p>}
      >
        <li>内容1</li>
        <li>内容2</li>
        <li>内容3</li>
      </List>
      <List
        title='列表2'
        footer={<p>底部2</p>}
      >
        <li>内容a</li>
        <li>内容b</li>
        <li>内容c</li>
      </List>
      <List
        title='列表3'
      >
        <li>内容x</li>
        <li>内容y</li>
        <li>内容z</li>
      </List>
    </>
  );
}

export default App;
