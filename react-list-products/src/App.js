import ProductList from './components/ProductList';
import HomePage from './components/HomePage';
import Footer from './components/common/footer';

function App() {
  return (
    <div>
      <div>
      <HomePage />
    </div>
        <h1>My Products</h1>
        <div className='container'>
        <ProductList/>
        </div>
     <Footer/>
    </div>
  );
}

export default App;
