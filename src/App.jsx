// npm install; npm run build
// npm run dev -- --host

// Library
import { useState,useEffect } from 'react'
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
import Api from './assets/Service/api';


function App({content}) {
  const results_api = new Api('https://jsonplaceholder.typicode.com/users');

  // eslint-disable-next-line react-hooks/rules-of-hooks
  let [result,setCount] = useState();
      

  useEffect(()=>{
    if(result !== undefined) console.log('result : ',result);
   

  },[result])
  function Addvalue(){
    
    return  results_api.getApi().then((value)=>{
      setCount(value)
     })
   
  }

  function Minusvalue(){
    
    setCount([])
  }
 
  console.log('content : ',result)
  return(
   
      <div style={{width:'100%',height:'100vh' ,overflow:'hidden'}}>
        <Mynavbar className='d-flex '/>
        <div className='d-flex '  style={{width:'100%',height:'90%' }}>
          <MySidebar />
          
          <div style={{width:'60%'}}>
            <button onClick={() => Addvalue()}>Show More</button>
            <button onClick={() => Minusvalue()}>Show Less</button>
            <Mycontent items={result === undefined ? []:result}/>
            
          </div>
          <MyOrderlist/>
          

        </div>
    </div>
   
   
   
  )
}

export default App
