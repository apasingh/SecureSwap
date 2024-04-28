import React from 'react';
import sampleImage from '../Secure.png';


const ProductRow = () => {
  return (
    <div className="row product">
      <div className="col-md-2">
        <img src={sampleImage} alt="Sample Image" height="150" />
      </div>
      <div className="col-md-8 product-detail">
        <h4>Blue T-Shirt</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div className="col-md-2 product-price">
        $19.99
      </div>
      <button className="btn btn-primary" style={{ backgroundColor: '#33443C'}}>
        Purchase
      </button>
    </div>
  );
}

export default ProductRow;