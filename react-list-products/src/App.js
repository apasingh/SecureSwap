import logo from './logo.svg';
import './App.css';
import ProductList from './productlist';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

        <div className="container">
      <header className="header">
        <h1>My Products</h1>
      </header>
      <ProductList />
      </div>
    </div>
  );
}

export default App;
