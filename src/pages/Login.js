import React, {useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';
import Rest from '../utils/useRest'


const url = 'https://identitytoolkit.googleapis.com/v1/'
const { usePost } = Rest(url)

function Login() {

  const [dataPost, singin] = usePost('accounts:signInWithPassword?key=AIzaSyA4bGva-lEY5oA50Agn48ixaWF_ueRdIVY', '')
  const [redi, setRedi] = useState(false);

  useEffect(() => {
    if(Object.keys(dataPost.data).length > 0){
      localStorage.setItem('token',dataPost.data.idToken)
      window.location.reload()
      
    }
  }, [dataPost]);
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      setRedi(true)
    }
  });

  if(redi){
    return <Redirect to='/' />
  }

  const login = async () => {
    
    await singin({
        email: 'contato@andrebomalves.xyz',
        password: '784512',
        returnSecureToken: true
    })
  }

return (
  <div className='container'>
    <h2>Login</h2>
    <pre>{JSON.stringify(dataPost)}</pre>
      <button onClick={login}>Login</button>
  </div>
);
}

export default Login;
