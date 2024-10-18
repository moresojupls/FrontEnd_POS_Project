// Library
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Mybutton from './assets/Components/Button/button'
import Myimg from './assets/Components/Image/img'
import MyCard from './assets/Components/Card_Menu/Card'
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
      <MySidebar/>
      
      <div className="card-wrapper" style={{paddingRight: '400px', marginTop : '8px'}}>
        <MyCard 
            myimg="https://images.unsplash.com/photo-1542452376175-82b6fb643412?q=80&w=1901&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            name="ชาไทย"
            price="20 bath"
        />
        <MyCard 
            myimg="https://images.unsplash.com/photo-1542452376175-82b6fb643412?q=80&w=1901&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            name="ชาไทย"
            price="20 bath"
        />
        <MyCard 
            myimg="https://images.unsplash.com/photo-1542452376175-82b6fb643412?q=80&w=1901&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            name="ชาไทย"
            price="20 bath"
        />
        <MyCard 
            myimg="https://images.unsplash.com/photo-1542452376175-82b6fb643412?q=80&w=1901&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            name="ชาไทย"
            price="20 bath"
        />

      </div>

      <div className="card-wrapper" style={{paddingRight: '400px', marginTop: '-40px'}}>
        <MyCard 
            myimg="https://images.unsplash.com/photo-1542452376175-82b6fb643412?q=80&w=1901&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            name="ชาไทย"
            price="20 bath"
        />
        <MyCard 
            myimg="https://images.unsplash.com/photo-1542452376175-82b6fb643412?q=80&w=1901&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            name="ชาไทย"
            price="20 bath"
        />
        <MyCard 
            myimg="https://images.unsplash.com/photo-1542452376175-82b6fb643412?q=80&w=1901&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            name="ชาไทย"
            price="20 bath"
        />
        <MyCard 
            myimg="https://images.unsplash.com/photo-1542452376175-82b6fb643412?q=80&w=1901&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            name="ชาไทย"
            price="20 bath"
        />

      </div>
    </>
  )
}

export default App
