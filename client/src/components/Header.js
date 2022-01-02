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
                    <span className='navbar-text'>Note: this site is unfinished; created as a learning excersise by someone who has never done this before.</span>
                    <div className='navbar-nav'>
                        <Link to='/character' className='nav-link'>Characters</Link>
                        <Link to='/account' className='nav-link'>Accounts</Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}