import img from './logo.svg'

function App() {
  const style = {
    className: 'small',
    style : {
      width: 100,
      height: 100,
      backgroundColor: 'gray'
    }
  }
  return (
    <div>
      <img
        src={img}
        alt=""
      // jsx展开语法 区别于ES6
        {...style}
      />
    </div>
  );
}

export default App;
