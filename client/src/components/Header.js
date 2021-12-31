import React from 'react';
import { Link } from 'react-router-dom';
// import './Header.css';

export const Header = () => {

    return(
        <div>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <div className='container-fluid'>
                    <Link to='/' className='navbar-brand'>
                        <img src={require("../res/eye.png")} alt="" width="30" height="100%"/>
                        DofusEye
                    </Link>
                    <div className='navbar-nav'>
                        <Link to='/character' className='nav-link'>Characters</Link>
                        <Link to='/account' className='nav-link'>Accounts</Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}