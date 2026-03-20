// npm install; npm run build
// npm run dev -- --host

// Library
import { useState,useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import 'bootstrap/dist/css/bootstrap.css';
import './App.css'

// component

import Mynavbar from './assets/Components/Navbar/navbar';
import MySidebar from './assets/Components/Sidebar/sidebar';











function App() {
  

  // eslint-disable-next-line react-hooks/rules-of-hooks

 
  

  const [token,settoken] = useState(); 
  
 
  // set up for page
 
  const navigate = useNavigate();





  const userData = localStorage.getItem("user");
  const teleportLogin = ()=>{
                navigate('/login');
           }
  const  fetchData =  async()=>{
        
          if (userData) {
            try{
               const parseUser = JSON.parse(userData)
              settoken(parseUser.Authorization.replace("Bearer ","")); 
           
          
              console.log('parseUser.Authorization ',parseUser)
               const api=await axios({
              method:"get",
              url:"http://127.0.0.1:4000/employees/employees",
              headers:{
                Authorization:"Bearer "+parseUser.Authorization.replace("Bearer ","")
                // Authorization:`Bearer ${parseUser.token}`
              }

            })
            console.log('token',api.headers)
           
            }catch(error){
              console.log('error ',error)
            }
           
          
            //localStorage.removeItem("user");
        } else {
      
          
            
            console.log('User',userData)
            if(userData == null || userData == undefined){
                teleportLogin();
            }
        }
      }
      useEffect(()=>{
        fetchData()
        },[])
  

  
  return(
    
      <div style={{width:'100%',height:'100vh' ,overflow:'hidden'}}>
        <Mynavbar className='d-flex  ' />
        <div className='d-flex justify-content-center'  style={{width:'100%',height:"100%" }}>
          <MySidebar />
          
          <div style={{width:'100%'}}>
           
            <Outlet/>
            
            {/* <Mycontent catagory={result !== undefined ? result:"Favourite"}/> */}
            
          </div>
          {/* <button onClick={()=>Or()}>Side</button> */}
          {/* <MyOrderlist setStateOrderlist={Orderlist}/> */}
        </div>
    </div>
  )
}

export default App