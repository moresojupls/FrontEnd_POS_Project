import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function LoginoutPage() {
 
    const navigate = useNavigate();
  useEffect(()=>{
     localStorage.removeItem('user');
    navigate('/login');

   
  },[])
  return (
  <></>
  )
}

export default LoginoutPage
