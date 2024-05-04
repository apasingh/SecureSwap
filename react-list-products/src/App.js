// Import MantineProvider from @mantine/core
import { Container, /*Header,*/ Title} from '@mantine/core';
// import './App.css';
import { WalletInstallation } from "./components/organisms/WalletInstallation";
import { WalletConnect } from "./components/organisms/WalletConnect";
import { InfinityTower } from './components/organisms/InfinityTower';

import logo from './ourlogo.png';
import ProductList from './components/ProductList';
import HomePage from './components/HomePage';

function App() {
  const { ethereum } = window;
  return (
    <div>
      <div>
        <HomePage />
      </div>

      {!ethereum ? (
          <Container p="lg">
            <WalletInstallation />
          </Container>
        ) : <InfinityTower/>}

      <h1>My Products</h1>

      <div className='container'>
        <ProductList />
      </div>

    </div>
  );
}

export default App;
