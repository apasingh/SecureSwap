import React, { Component } from 'react';
import ProductRow from './ProductRow';

class ProductList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <footer className='footer  bg-footer'>
          <div className='container'>
          <div className='row'>
              <h3> My Products </h3> 
          </div>
          
          </div>
      </footer>
      <div className="container main-content">
        <ProductRow />
        <ProductRow />
      </div>
      </div>
    );
  }
}

export default ProductList;