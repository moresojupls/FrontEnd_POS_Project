import React from 'react'
import '../../../MyCard.css'
import  { useState,cache } from 'react'
// import Button from 'react-bootstrap/Button';
import { Button, ButtonGroup } from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import NumberInputBasic from '../Amount_label/Amount_label';
import Pending_Order from '../Pending_Order/Pending_Order';

function MyCard({ img, name, id, price,amount=1,total=0}) {

  const [show, setShow] = useState(false);

  // States for customization options
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedSugar, setSelectedSugar] = useState(50);
  const [toppings, setToppings] = useState({
    ไข่มุก: false,
    เยลลี่: false,
    บุก: false,
    วิปครีม: false,
  });
  const [quantity, setQuantity] = useState(1);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleToppingChange = (topping) => {
    setToppings((prev) => ({ ...prev, [topping]: !prev[topping] }));
  };

  const handleAddOrder = () => {
    const newOrder = {
      id,
      name,
      img,
      price,
      selectedMood,
      selectedSize,
      selectedSugar,
      toppings,
      quantity,
      amount,
      total,
    };
   

    const storedOrders = JSON.parse(window.localStorage.getItem("order_list")) || [];
    // console.log(localStorage.getItem("order_list"));
    const sameorder = storedOrders.filter((value,index)=>value.id == newOrder.id);
    let  updatedOrders = [];
    if(sameorder.length > 0){
      const findorder = storedOrders.find((value,index)=>
        value.id == newOrder.id
      );
      findorder.amount +=1;
      findorder.total = findorder.amount * findorder.price;
      console.log(findorder)
      updatedOrders = [...storedOrders];

    }else{
      newOrder.total = newOrder.price;
      
      updatedOrders = [...storedOrders, newOrder];
    }
    window.localStorage.setItem("order_list", JSON.stringify(updatedOrders));
    setShow(false);
    window.dispatchEvent(new Event("storage")); // สร้าง event เพื่อแจ้ง Pending_Order
  };

  price = 10;
  return (
    <>
      
  <div className="card-wrapper" style={{ width: "240px", display: 'inline-block' }}>
    <div className="card" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer',border: '1px solid #FF5733' }}
        onClick={handleShow} // เพิ่ม onClick ตรงนี้
        >
      <img src={img} alt="Not Found Img" style={{ width: '100%', borderRadius: "8px" }} />
      <div style={{ marginLeft: '10px', textAlign: 'center', flex: 1 }}>
      <h6> Name : {name} </h6>
      <h5><b> Price : {price !== undefined ? 'Price' : ''}{price} </b> </h5>
    </div>
  </div>
</div>

  
<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div style={{ textAlign: "center" }}>
            <img src={img} alt="" style={{ width: "35%", borderRadius: "8px" }} />
            <h3>{name}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "10px" }}>
  {/* แถวแรก: Mood กับ Size */}
  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
    {/* Mood */}
    <div style={{ flex: 1 }}>
      <h5>Mood</h5>
      <ButtonGroup>
        <Button
          variant={selectedMood === "Hot" ? "contained" : "outlined"}
          onClick={() => setSelectedMood("Hot")}
        >
          🔥 Hot
        </Button>
        <Button
          variant={selectedMood === "Cold" ? "contained" : "outlined"}
          onClick={() => setSelectedMood("Cold")}
        >
          ❄️ Cold
        </Button>
      </ButtonGroup>
    </div>

    {/* Size */}
    <div style={{ flex: 1 }}>
      <h5>Size</h5>
      <ButtonGroup>
        {["S", "M", "L"].map((size) => (
          <Button
            key={size}
            variant={selectedSize === size ? "contained" : "outlined"}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  </div>

  {/* แถวที่สอง: Sugar กับ Topping */}
  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
    {/* Sugar */}
    <div style={{ flex: 1 }}>
      <h5>Sugar</h5>
      <ButtonGroup>
        {[25, 50, 75, 100].map((level) => (
          <Button
            key={level}
            variant={selectedSugar === level ? "contained" : "outlined"}
            onClick={() => setSelectedSugar(level)}
          >
            {level}%
          </Button>
        ))}
      </ButtonGroup>
    </div>

    {/* Topping */}
    <div style={{ flex: 1 }}>
      <h5>Topping</h5>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)", // แบ่งเป็น 2 คอลัมน์
          gap: "10px", // ระยะห่างระหว่างแต่ละช่อง
        }}
      >
        {["ไข่มุก", "เยลลี่", "บุก", "วิปครีม"].map((topping, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <input
              type="checkbox"
              id={topping}
              value={topping}
              onChange={(e) => handleToppingChange(e.target.value, e.target.checked)}
            />
            <label htmlFor={topping} style={{ marginLeft: "10px" }}>{topping}</label>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ color: "white", background: "green" }} onClick={handleAddOrder}>
            Done
          </Button>
          <Button style={{ color: "white", background: "red" }} onClick={handleClose}>
            Cancel
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


