import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import 'bootstrap/dist/css/bootstrap.css';


import Myimg from '../Image/img'
import Logo from './MilkTea_logo.png';
import { useState,useEffect } from 'react';

function Mynavbar() {
  function UserDisplay(){
    const data = {
      name:'champ',
      gender:'man'
    }
    return `${data.gender === 'man'?'Mr':'Miss'}  ${data.name}`;
  }
  function DateNow(){
    const date = new Date();
    const day = `${ date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return day+time
  }
  const [date,setDate] = useState(0);
  useEffect(()=>{
    setTimeout(()=>{
        setDate(()=>
          DateNow()
        
        )
    },1000)
  })
    // const [date,setDate] = useState();
    // var newDate = new Date();

    // setInterval(()=>{
    //     setDate(newDate.getHours()+' : '+newDate.getMinutes()+' : '+newDate.getSeconds())
    // },1000)
  return (
  
      
      <Navbar bg="prinary  "   expand="lg" className='d-flex '  fixed="top">
       
          
          <Navbar.Brand className='d-flex flex-row' href="home">
            <Myimg url={Logo} size={"40px"} />
            <h2>Welcome</h2>
            
          </Navbar.Brand>
          <Container className='d-flex justify-content-end'>
            <Navbar.Text className='mx-4'>
                <div>
                  <h5>Time {date}</h5>
                </div>
            </Navbar.Text>

            <Navbar.Text className='mx-4'>
                <div>
                  <h5>User {UserDisplay()}</h5>
                </div>
            </Navbar.Text>
          </Container>
          
            
        
         
          
       
        
   
        </Navbar>
   
  )
}

    
export default Mynavbar
