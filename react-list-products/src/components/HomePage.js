import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div>
      <img src = "../Body.png"></img>
      <main>
        <div className = "header">
        <img src="../Secure.png" alt="logo" style={{ float: 'left', width: '200px', height: '200px' }}/>
        <h1>SecureSwap</h1>
    </div>
      </main>
    </div>
  );
}

export default HomePage;