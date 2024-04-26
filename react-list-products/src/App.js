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
    <div>
      <HomePage />
    </div>
        <div className='container'>
        <ProductList/>
        </div>
     <Footer/>
    </div>
  );
}

export default App;
