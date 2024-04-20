import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div>

      <main>
        <div className = "header">
        <img src="../ourlogo.png" alt="logo" style={{ float: 'left', width: '200px', height: '200px' }}/>
        <h1>SecureSwap</h1>
    </div>
        <img src = "../Body.png"></img>
      </main>
    </div>
  );
}

export default HomePage;