import React, { useEffect } from 'react'


function LoginPage() {
 
 
  const login =async()=>{
    await fetch('http://127.0.0.1:4000/employees/login',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "email":"dwf",
        "password":"123456789"
      })
    }).then((res)=>{
      return res.json();
    }).then((result)=>{
      localStorage.setItem("user",JSON.stringify(result));
    
    })
  }
  return (
    <div>
      
      <button onClick={login}>Click</button>
    </div>
  )
}

export default LoginPage
