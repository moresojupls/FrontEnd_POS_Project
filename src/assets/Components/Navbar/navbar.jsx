
// assets
import 'bootstrap/dist/css/bootstrap.css';
import image from '../../image';

// component
import Myimg from '../Image/img'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

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
    const day = `${ date.getDay()}/${date.getMonth()}/${date.getFullYear()} `;
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

  return (
  
      
      <Navbar bg="prinary  "   expand="lg" className='d-flex container-fluid'  >
       
          
          <Navbar.Brand className='d-flex flex-row' href="home">
            <Myimg url={image.LogoBrand} size={"40px"} />
            <h2>MilkTea</h2>
            
          </Navbar.Brand>
          <Container className='d-flex justify-content-end'>
            <Navbar.Text className='mx-4'>
                <div className='d-flex flex-row'>
                  <Myimg url={image.Time} size={30}/>
                  <h5 className='mx-2'> {date}</h5>
                </div>
            </Navbar.Text>

            <Navbar.Text className='mx-4 '>
                <div className='d-flex flex-row'>
                  <Myimg url={image.User} size={30}/>
                  <h5 className='mx-2'> {UserDisplay()}</h5>
                </div>
            </Navbar.Text>
          </Container>
          
            
        
         
          
       
        
   
        </Navbar>
   
  )
}

    
export default Mynavbar
