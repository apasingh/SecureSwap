import ProductList from './components/ProductList';
import HomePage from './components/HomePage';
import Footer from './components/common/footer';
import Header from './components/common/Header';

function App() {
  return (
    <div>
      <div>
      <Header />
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
