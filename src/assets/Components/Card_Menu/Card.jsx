import React from 'react'
import '../../../MyCard.css'
import  { useState,cache } from 'react'
// import Button from 'react-bootstrap/Button';
import { Button, ButtonGroup } from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import NumberInputBasic from '../Amount_label/Amount_label';
import Pending_Order from '../Pending_Order/Pending_Order';

function MyCard({ img, name, id, price,amount=1}) {

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const handleAddOrder = () => {
    const newOrder = { id, name, img, price,amount};
    const storedOrders = JSON.parse(window.localStorage.getItem("order_list")) || [];
    console.log("newOrder"+newOrder.id);
    // check new order have same old order
    const sameorder = storedOrders.filter((value,index)=>value.id == newOrder.id);
    let  updatedOrders = [];
    if(sameorder.length > 0){
      const findorder = storedOrders.find((value,index)=>
        value.id == newOrder.id
      );
      findorder.amount +=1;
      updatedOrders = [...storedOrders];

    }else{
      updatedOrders = [...storedOrders, newOrder];
    }
   
    
    console.log('update',sameorder)
      // บันทึกข้อมูลลงใน localStorage
    window.localStorage.setItem('order_list', JSON.stringify(updatedOrders));
    setShow(false);
    // trigger event to notify Pending_Order to update
    window.dispatchEvent(new Event('storage')); // สร้าง event เพื่อแจ้ง Pending_Order
  };

  price = 10;
  return (
    <>
      <div className="card-wrapper" style={{ width: "240px", display: 'inline-block' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={img} alt="Not Found Img" style={{ width: '100%', borderRadius: "8px" }} />
          <div style={{ marginLeft: '10px', textAlign: 'center', flex: 1 }}>
          <h6> Name : {id} </h6>
            <h6> Name : {name} </h6>
            <h5><b> Price : {price !== undefined ? 'Price' : ''}{price} </b> </h5>
            <button onClick={handleShow}>Click Here</button>
          </div>
        </div>
      </div>
  
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton> </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <img src={img} alt="" style={{width: '35%', borderRadius: '8px' }} />
            <div style={{ paddingLeft: '20px' }}>
              <h3>{name}</h3>
              <div style={{ fontSize: '30px' }}>
                Total {price} bath
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ color: 'white', background: 'green' }} onClick={handleAddOrder}>
            Add
          </Button>
          <Button style={{ color: 'white', background: 'red' }} onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  
} 

export default MyCard


// function MyCard({img,name,id,price}) {
  
//   const [show, setShow] = useState(false);
//   const handleClose = () => {
//     const result_order = new Object({
//       "id":id,
//       "name":name,
//       "img":img,
//       "price":price,
//     })
  
 
//     window.localStorage.setItem('result_order',JSON.stringify(result_order));
    
//     setShow(false);
//   }
//   const handleShow = () => setShow(true);


//   price=10;
//   return (
//     <>

//     <div className="card-wrapper" style={{width:"230px"}}>
//       <div className="card" >
//         <img src={img} alt="Not Found Img" style={{display: 'flex'   , borderRadius:"8px" }} />
//           {/* <h7> ID : {id} </h7> */}
//           <h7> Name : {name} </h7>
//           <h5><b> Price : {price !== undefined ?'Price':''}{price} </b> </h5>
//           <button onClick={handleShow}>Click Here</button>
//       </div>
//     </div>
    
//     <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>{name}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>

//           <div style={{flexDirection:'column',justifyContent:'center',justifyItems:'center'}}>
//             <img src={img} alt="" style={{ width: '100%', borderRadius: '8px' }} />
            
            

            // <div  style={{display:'flex',flexDirection:'row',paddingTop:'25px'}}>
            //   <h4 style={{fontFamily:'cursive'}}>Sweetness</h4>
            //   <ButtonGroup variant="outlined" aria-label="Basic button group">
            //   <Button>0</Button>
            //   <Button>25</Button>
            //   <Button>50</Button>
            //   <Button>75</Button>
            //   <Button>100</Button>
            //   </ButtonGroup>
            // </div>

//             <div style={{paddingBottom:'10px',paddingTop:'10px'}}> <NumberInputBasic/> </div>  

//             <div style={{fontFamily:'cursive',fontSize:'30px',  }}>
//             Total {price} bath
//             </div> 
//           </div>
//           </Modal.Body>
//         <Modal.Footer>
//           <Button style={{color:'white',background:'red'}} onClick={handleClose}>
//             Close
//           </Button>
//           <Button style={{color:'white',background:'green'}} onClick={handleClose}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//     </Modal>

//     </>

//   )
// }


// export default MyCard


