import React from 'react';
import './HomePage.css';
import Body from '../Body.png';

const HomePage = () => {
  return (
    <div>
      <img src = {Body} style={{ float: 'center', width: '100%', height: '700px' }}></img> 
    </div>
  );
}

export default HomePage;