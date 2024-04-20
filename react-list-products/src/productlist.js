//components/ProductList.js

import React, { Component } from 'react';
import ProductRow from './productrow';

class ProductList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container main-content">
        <ProductRow />
        <ProductRow />
      </div>
    );
  }
}

export default ProductList;