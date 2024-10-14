import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.css';

import React, { useState } from 'react'
import Myimg from '../Image/img'
import Logo from './MilkTea_logo.png';

function Mynavbar() {
    // const [date,setDate] = useState();
    // var newDate = new Date();

    // setInterval(()=>{
    //     setDate(newDate.getHours()+' : '+newDate.getMinutes()+' : '+newDate.getSeconds())
    // },1000)
  return (
    <div>
    <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
      <Container>
        <Myimg url={Logo} size={"80px"} />
        <Navbar.Brand href="#home"c>MilkTea</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Text  />
        {/* <h1>{date   }</h1> */}
      </Container>
      </Navbar>
    </div>
  )
}

    
export default Mynavbar
