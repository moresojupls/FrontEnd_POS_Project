// npm install; npm run build
// npm run dev -- --host

// Library
import { useState,useEffect } from 'react'
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';




import 'bootstrap/dist/css/bootstrap.css';


// component

import Mynavbar from '../Navbar/navbar';
import MySidebar from '../Sidebar/sidebar';
import MyOrderlist from '../Orderlist/orderlist';
import SimpleSlider from '../Carousel/Carousel';


// data







function Structure() {
  

  // eslint-disable-next-line react-hooks/rules-of-hooks

 
  const [result,setResult] = useState();
 
  // set up for page
 




 
 

  return(
   
      <div style={{width:'100%',height:'100vh' ,overflow:'scroll'}}>
        <Mynavbar className='d-flex '/>
        <div className='d-flex '  style={{width:'100%',height:'90%' }}>
          <MySidebar />
          
          <div style={{width:'60%'}}>
           
     
            {/* <Mycontent catagory={result !== undefined ? result:"Favourite"}/> */}
            <SimpleSlider/>
          </div>
          <MyOrderlist/>
          

        </div>
    </div>
   
   
   
  )
}

export default Structure
