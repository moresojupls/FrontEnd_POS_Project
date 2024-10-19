// npm install; npm run build
// npm run dev -- --host

// Library
import { useState } from 'react'
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';




import 'bootstrap/dist/css/bootstrap.css';
import './App.css'

// component
import Mybutton from './assets/Components/Button/button';
import Mynavbar from './assets/Components/Navbar/navbar';
import MySidebar from './assets/Components/Sidebar/sidebar';
import MyOrderlist from './assets/Components/Orderlist/orderlist';
import MyRouter from './Router'
import Mycontent from './assets/Components/content/content';



function App({content}) {
 
  
  return(
   
      <div>
        <Mynavbar className='d-flex '/>
        <div className='d-flex '  style={{width:'100%' }}>
          <MySidebar />
          
          <div style={{width:'60%'}}>
            <Mycontent items={content}/>
          </div>
          <MyOrderlist />
          
        

        </div>
    </div>
   
   
   
  )
}

export default App
