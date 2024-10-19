import React from 'react'
import App from '../../../App'

function Userpage() {
    const data = [{
        myimg : "https://images.unsplash.com/photo-1542452376175-82b6fb643412?q=80&w=1901&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        id : 0,
        name : "สมศรี",
        price : "20 bath"
      },]
  return (
    <App content={data}></App>
   
  )
}

export default Userpage