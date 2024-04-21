import React, { Component } from 'react';
import ProductRow from './ProductRow';
import Commerce from '@chec/commerce.js';

// console.log(process.env);
// const commerce = new Commerce(process.env.REACT_APP_SP);
const commerce = new Commerce(pk_test_5684718dc48ac77971f3f1ff85ad94c80bec7e409b455);

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    }
  }

  componentDidMount() {
    commerce.products.list().then((result) => {
      this.setState({ products: result.data || [] });
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