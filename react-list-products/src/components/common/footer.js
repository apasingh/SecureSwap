import React from 'react';
import '../Styles.css';

function Footer()
{

    return(

        <React.Fragment>
            <footer className='footer  bg-footer'>
                <div className='container'>
                <div className='row pt-5 pb-5'>
                    <div className='col-md-3'>
                      <h5>SecureSwap: </h5>
                      <p>We aim to eliminate the risk of buyers and sellers getting scammed on common secondhand marketplaces.</p>
                    </div>
                    <div className='col-md-3'>
                    <h5>Navigation</h5>
                    <ul className='nav flex-column'>
                        <li className='nav-item'>
                            <a href='/' className='nav-link'>Home</a>
                        </li>
                        <li className='nav-item'>
                            <a href='/' className='nav-link'>Contact us</a>
                        </li>
                        <li className='nav-item'>
                            <a href='/' className='nav-link'>Login</a>
                        </li>
                    </ul>
                    </div>
                    <div className='col-md-3'>
                    <h5>Services</h5>
                    <ul className='nav flex-column'>
                        <li className='nav-item'>
                            <a href='/' className='nav-link'>List a Product</a>
                        </li>
                        <li className='nav-item'>
                            <a href='/' className='nav-link'>Purchase</a>
                        </li>
                        <li className='nav-item'>
                            <a href='/' className='nav-link'>About Us</a>
                        </li>
                    </ul>
                    </div>
                    <div className='col-md-3'>
                    <h5>Unhappy?</h5>
                    <p>File a Complaint</p> 
                    </div>
                </div>
                
                </div>
            </footer>
            
        </React.Fragment>
    );
}

export default Footer;