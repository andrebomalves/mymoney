import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';


function Header() {

    const onClickSair = () =>{
      localStorage.removeItem('token')
      //window.location.reload()
      const redirect = window.location.origin
      window.location.assign(redirect)
      window.location.reload()
    }
    return (
        <div className='navbar navbar-light bg-light'>
            <div className='container'>
                <Link className='navbar-brand' to='/'>My Money</Link>
                {localStorage.getItem('token') && <button className="btn btn-outline-dark my-2 my-sm-0" onClick={onClickSair} >Sair</button>}
            </div>
        </div>
    )
}

export default Header


