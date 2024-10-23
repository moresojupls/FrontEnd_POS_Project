import React from 'react'
import '../../../MyCard.css'
import  { useState } from 'react'
// import Button from 'react-bootstrap/Button';
import { Button, ButtonGroup } from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import NumberInputBasic from '../Amount_label/Amount_label';


function MyCard({img,name,id,price}) {
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  price=10;
  return (
    <>

    <div className="card-wrapper" style={{width:"230px"}}>
      <div className="card" >
        <img src={img} alt="Not Found Img" style={{display: 'flex'   , borderRadius:"8px" }} />
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

          <div style={{flexDirection:'column',justifyContent:'center',justifyItems:'center'}}>
            <img src={img} alt="" style={{ width: '100%', borderRadius: '8px' }} />
            
            

            <div  style={{display:'flex',flexDirection:'row',paddingTop:'25px'}}>
              <h4 style={{fontFamily:'cursive'}}>Sweetness</h4>
              <ButtonGroup variant="outlined" aria-label="Basic button group">
              <Button>0</Button>
              <Button>25</Button>
              <Button>50</Button>
              <Button>75</Button>
              <Button>100</Button>
              </ButtonGroup>
            </div>

            <div style={{paddingBottom:'10px',paddingTop:'10px'}}> <NumberInputBasic/> </div>  

            <div style={{fontFamily:'cursive',fontSize:'30px',  }}>
            Total {price} bath
            </div> 
          </div>
          </Modal.Body>
        <Modal.Footer>
          <Button style={{color:'white',background:'red'}} onClick={handleClose}>
            Close
          </Button>
          <Button style={{color:'white',background:'green'}} onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
    </Modal>

    </>

  )
}

export default MyCard
