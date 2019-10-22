import React from 'react'
import { Link } from 'react-router-dom';


function Header() {
    return (
        <div className='navbar navbar-light bg-light'>
            <div className='container'>
                <Link className='navbar-brand' to='/'>My Money</Link>
            </div>
        </div>
    )
}

export default Header


