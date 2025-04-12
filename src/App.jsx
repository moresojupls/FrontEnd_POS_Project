// npm install; npm run build
// npm run dev -- --host

// Library
import { useState,useEffect } from 'react'
import { Outlet,Router,Routes,Route,Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



import 'bootstrap/dist/css/bootstrap.css';
import './App.css'

// component

import Mynavbar from './assets/Components/Navbar/navbar';
import MySidebar from './assets/Components/Sidebar/sidebar';
import Mycontent from './assets/Components/content/content';
import Mybutton from './assets/Components/Button/button';


// data
import GreenTea from './assets/MockUpData/Product/Greentea';
import Favourite from './assets/MockUpData/Product/Favourite';






function App() {
  

  // eslint-disable-next-line react-hooks/rules-of-hooks

 
  const [result,setResult] = useState();
  const [Orderlist,setOrderlist] = useState(true);
  const [user,setUser] = useState(); 
  
 
  // set up for page
 
  const navigate = useNavigate();





  const userData = localStorage.getItem("user");
      useEffect(()=>{
          if (userData) {
            setUser(JSON.parse(userData)); // ✅ Safe parsing
            
            localStorage.removeItem("user");
        } else {
      
           
            const token = ()=>{
                navigate('/login');
            }
            console.log('User',userData)
            if(userData == null || userData == undefined){
                token();
            }
        }
        },[])
  

  function Or(){
    return setOrderlist(!Orderlist)
  }
  return(
    
      <div style={{width:'100%',height:'100vh' ,overflow:'hidden'}}>
        <Mynavbar className='d-flex '/>
        <div className='d-flex justify-content-center'  style={{width:'100%',height:'90%' }}>
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