import logo from './ourlogo.png';
import ProductList from './components/ProductList';
import HomePage from './components/HomePage';

function App() {
  return (
    <div>
      <div>
      <HomePage />
    </div>
        <h1>My Products</h1>
        <div>
          <img src="./Body.png"></img>
        </div>
        <div className='container'>
        <ProductList/>
        </div>
     
    </div>
  );
}

export default App;
