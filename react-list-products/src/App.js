import logo from './ourlogo.png';
import ProductList from './components/ProductList';
import HomePage from './components/HomePage';

function App() {
  return (
    <div>
      <div>
      <HomePage />
    </div>
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
