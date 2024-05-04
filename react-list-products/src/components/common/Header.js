import React, { useState, useEffect} from 'react';
import '../HomePage.css';
import OurLogo from '../../Secure.png';

function Header()
{
    return(

        <React.Fragment>
            <div className='header'>
            <img src={OurLogo} alt="Our Logo"  style={{ float: 'center', width: '90px', height: '90px' }} />
            <h1 style={{ color:'#81A969'}}>SecureSwap</h1>
            </div>
        </React.Fragment>
    );
}

export default Header;