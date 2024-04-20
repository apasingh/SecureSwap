import React, { Component } from 'react';
import ProductRow from './ProductRow';
import Commerce from '@chec/commerce.js';
require('dotenv').config();

console.log(process.env);

const commerce = new Commerce(process.env.sandbox_pubkey);

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    }
  }

  componentDidMount() {
    commerce.products.list().then((result) => {
      this.setState({ products: result.data });
    });
  }

  render() {
    return (
      <div className="container main-content">
        {
          this.state.products.map(product => {
            return <ProductRow key={product.id} image={product.media.source} name={product.name} description={product.description} price={product.price.formatted_with_symbol} />
          })
        }
      </div>
    );
  }
}

export default ProductList;