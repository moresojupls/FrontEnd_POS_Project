// npm install; npm run build
// npm run dev -- --host

// Library
import { useState,useEffect } from 'react'
import { Outlet,Router,Routes,Route,Link } from 'react-router-dom';




import 'bootstrap/dist/css/bootstrap.css';
import './App.css'

// component

import Mynavbar from './assets/Components/Navbar/navbar';
import MySidebar from './assets/Components/Sidebar/sidebar';
import MyOrderlist from './assets/Components/Orderlist/orderlist';
import Mycontent from './assets/Components/content/content';
import Mybutton from './assets/Components/Button/button';


// data
import GreenTea from './assets/MockUpData/Greentea';
import Favourite from './assets/MockUpData/Favourite';






function App() {
  

  // eslint-disable-next-line react-hooks/rules-of-hooks

 
  const [result,setResult] = useState();
 
  // set up for page
 




 
 

  return(
      <div style={{width:'100%',height:'100vh' ,overflow:'hidden'}}>
        <Mynavbar className='d-flex '/>
        <div className='d-flex '  style={{width:'100%',height:'90%' }}>
          <MySidebar />
          
          <div style={{width:'60%'}}>
           
            <Outlet/>
            {/* <Mycontent catagory={result !== undefined ? result:"Favourite"}/> */}
            
          </div>
          <MyOrderlist/>
          

        </div>
    </div>
  )
}

export default App
