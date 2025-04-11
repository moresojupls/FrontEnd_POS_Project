
// assets
import 'bootstrap/dist/css/bootstrap.css';
import image from '../../image';
import House from '../../image/House.png';

// component
import Myimg from '../Image/img'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css';
import { useState,useEffect } from 'react';


function Mynavbar() {
  function UserDisplay(){
    const  user =  JSON.parse(localStorage.getItem("user")) || null;
 
    if(user != null) return `${user.gender === 'man'?'Mr':'Miss'} ${user.result.user} `;
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
  
      
      <Navbar  bg="prinary  "   className='container-fluid Navbar'  >
       
          
          <Navbar.Brand  className='d-flex flex-row    justify-content-start' >
            <Myimg className=" " url={image.LogoBrand} size={"40px"} />
            <h2>MilkTea</h2>
            
          </Navbar.Brand>
          <Container className='d-flex flex-row   justify-content-end' >
            <Navbar.Text className='mr-2 '>
                <div className='d-flex flex-row '>
                  {/* <img src="image/House.png" alt="fasf" /> */}
          
                  <Myimg url={image.Time} size={30}/>
                  <h5 className='mx-2'> {date}</h5>
                </div>
            </Navbar.Text>

            <Navbar.Text className='mr-2'>
                <div className='d-flex flex-row '>
                  
                  <Myimg url={image.User} size={30}/> 
                  <h5 className='mr-2'> {UserDisplay()}</h5>
                </div>
            </Navbar.Text>
          </Container>
          
            
        
         
          
       
        
   
        </Navbar>
   
  )
}

    
export default Mynavbar
