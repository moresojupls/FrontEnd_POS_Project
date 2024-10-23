import React from 'react'
import '../../../MyCard.css'
import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
import { Button, ButtonGroup } from '@mui/material';
import Modal from 'react-bootstrap/Modal';


function MyCard({img,name,id,price}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  price=10;
  return (
    <>

    <div className="card-wrapper" style={{width:"230px"}}>
      <div className="card" >
        <img src={img} alt="" style={{display: 'flex'   , borderRadius:"8px" }} />
          <h7> ID : {id} </h7>
          <h7> Name : {name} </h7>
          <h5><b> Price : {price !== undefined ?'Price':''}{price} </b> </h5>
          <button onClick={handleShow}>Click Here</button>
      </div>
    </div>
    
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div style={{display:'flex',flexDirection:'column',alignContent:'center',alignItemsItems:'center'}}>
            <img src={img} alt="" style={{ width: '100%', borderRadius: '8px' }} />
            
            <ButtonGroup variant="outlined" aria-label="Basic button group">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>           

            <div style={{fontFamily:'cursive',fontSize:'30px'}}>
              {price} บาท
            </div> 
          </div>
          </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
    </Modal>

    </>

  )
}

export default MyCard
