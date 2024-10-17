import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import 'bootstrap/dist/css/bootstrap.css';


import Myimg from '../Image/img'
import Logo from './MilkTea_logo.png';

function Mynavbar() {
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
                  <h3>Time</h3>
                </div>
            </Navbar.Text>

            <Navbar.Text className='mx-4'>
                <div>
                  <h3>User</h3>
                </div>
            </Navbar.Text>
          </Container>
          
            
        
         
          
       
        
   
        </Navbar>
   
  )
}

    
export default Mynavbar
