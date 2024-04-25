import React, { useState, useEffect} from 'react';
import '../HomePage.css';
import OurLogo from '../../Secure.png';

function Header()
{
    return(

        <React.Fragment>
            <img src={OurLogo} alt="Our Logo"  style={{ float: 'center', width: '90px', height: '90px' }} />
            <footer className='footer  bg-footer'>
            <div className = "header">
                <h1>SecureSwap</h1>
            </div>
            </footer>
            
        </React.Fragment>
    );
}

export default Header;