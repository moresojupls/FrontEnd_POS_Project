// Library
import { useState } from 'react'

// assets
import Myimg from './assets/Components/Image/img';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'

// component
import Mybutton from './assets/Components/Button/button';
import Mynavbar from './assets/Components/Navbar/navbar';
import MySidebar from './assets/Components/Sidebar/sidebar';
import MyOrderlist from './assets/Components/Orderlist/orderlist';



function App() {
  const [count, setCount] = useState(0)

  return(
    <div> 
      <Mynavbar />
      <div className='d-flex '  style={{width:'100%' ,marginTop:'20px'}}>
        <MySidebar />
        <h1 style={{width:'60%'}}>Card</h1>
        <MyOrderlist />
      </div>
     
      
    </div>
  )
}

export default App
