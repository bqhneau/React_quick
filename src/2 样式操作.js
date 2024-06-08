import img from './logo.svg'

function App() {
  const imgStyle = {
    width: 100,
    height: 100,
    backgroundColor: 'gray'
  }
  return (
    <div>
      <img
        src={img}
        alt=""
        className='small'
        style={imgStyle}
      />
    </div>
  );
}

export default App;
