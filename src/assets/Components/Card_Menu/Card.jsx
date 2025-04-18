import React, { useEffect } from 'react'
import '../../../MyCard.css'
import  { useState,cache } from 'react'
// import Button from 'react-bootstrap/Button';
import { Button, ButtonGroup } from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import Myimg from '../Image/img';
import NumberInputBasic from '../Amount_label/Amount_label';
import Pending_Order from '../Pending_Order/Pending_Order';
import "./Card.css";

function MyCard({ img, name, size,id, price,amount=1,total=0}) {

  const [show, setShow] = useState(false);

  // States for customization options
  const [selectedMood, setSelectedMood] = useState("Cold");
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedSugar, setSelectedSugar] = useState(50);
  ["Bubble", "Jelly", "konjac", "Whisp"]
  const [toppings, setToppings] = useState({
    Bubble: false,
    Jelly: false,
    konjac: false,
    Whisp: false,
  });
  const [quantity, setQuantity] = useState(1);
  const [cardPrice,setPrice]= useState(price);
  
  const topping = [];
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
      size,
      amount,
      total,
    };
   console.log('newOrder : ',newOrder)
    
    const storedOrders = JSON.parse(window.localStorage.getItem("order_list")) || [];
    // console.log(localStorage.getItem("order_list"));
    const sameorder = storedOrders.filter((value,index)=>value.id == newOrder.id);
    let  updatedOrders = [];
    if(sameorder.length > 0){
      const findorder = storedOrders.find((value,index)=>
        value.id == newOrder.id
      );
      console.log('findorder',newOrder)
      sameorder[0].quantity = quantity;
      findorder.amount = findorder.amount + quantity;
      console.log('findorder',storedOrders)
      findorder.total += cardPrice;
      console.log('dasfaf',quantity)
      updatedOrders = [...storedOrders];

    }else{
      newOrder.total = cardPrice;
      newOrder.amount = quantity;

      
      updatedOrders = [...storedOrders, newOrder];
    }
    window.localStorage.setItem("order_list", JSON.stringify(updatedOrders));
    setShow(false);
    window.dispatchEvent(new Event("storage")); // สร้าง event เพื่อแจ้ง Pending_Order
  };
  const [old,setOld] = useState([]); 
  useEffect(()=>{
    
    switch(selectedSize){
      case "S":
        setPrice(()=>price);
        console.log('price2 : ',cardPrice)
        break;
      case "M":
        setPrice(()=>price+5);
        console.log('price2 : ',cardPrice)
        break;
      case "L":
        setPrice(()=>price+10);
        console.log('price2 : ',cardPrice)
        break;
      default:
        break;
    }
  },[selectedSize])
  useEffect(()=>{
    if(selectedMood ==  'Hot'){
      setPrice(()=>price-5)
    }
    else{
      setPrice(()=>price)
    }
  },[selectedMood])
  useEffect(()=>{
    //  Bubble: false,
    // Jelly: false,
    // konjac: false,
    // Whisp: false,
   
    
    Object.keys(toppings).forEach((res)=>{
      if(toppings[res] == true){
        topping.push(res)
        
        switch(res){
          case "Bubble":
            setPrice(()=>cardPrice+5)
            topping.push(res)
            break;
          case "Jelly":
            setPrice(()=>cardPrice+10)
            topping.push(res)
            break;
          case "konjac":
            setPrice(()=>cardPrice+10)
            topping.push(res)
            break;
          case "Whisp":
            setPrice(()=>cardPrice+15)
            topping.push(res)
            break;
          default:
            break;
        }
       
      }
      // check filter old value is same topping
      const search = old.filter((res)=>(
        !topping.includes(res)
      ))
      // decreseable price 5 bath
      search.map(()=>(
        setPrice(()=>cardPrice-5)
      ))

      // old Value
      setOld(()=>topping)
  
      
    
      
    })
  
  },[toppings])
  

  const handleIncrease = () => {
    setQuantity(quantity + 1);  // เพิ่มจำนวน
    setPrice(()=>(cardPrice+(cardPrice/quantity)));
  
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);  // ลดจำนวน ถ้าจำนวนมากกว่า 1
      setPrice(()=>cardPrice-(cardPrice/quantity));
    }
  };


  return (
    <>
      
  <div className="card-wrapper" style={{ width: "260px", display: 'inline-block' }}>
    <div className="card" style={{ display: 'flex',alignItems: 'center', cursor: 'pointer',border: '1px solid #FF5733',height:"100%" }}
        onClick={handleShow} // เพิ่ม onClick ตรงนี้
        >
      <img src={img || "https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?fit=845%2C503&ssl=1https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPBuxmi4ZuZtcqpZC0ipa-5mwlpJbXmDQotQ&s"} alt="Not Found Img" style={{height:'100px', width: '100%', borderRadius: "8px" }} />
      <div style={{ marginLeft: '10px', textAlign: 'center', flex: 1 }}>
      <h6>  {name} </h6>
      <h5><b>  {price !== undefined ? price : ''}  Bath </b> </h5>
    </div>
  </div>
</div>

  
<Modal className={"custom-border-modal"} show={show} onHide={handleClose}  backdrop={"static"} centered keyboard >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body >
          <div style={{ textAlign: "left" }}>
            <div style={{display:"flex"}}>
              <Myimg url={img} size={180}/>
              
              <div className='m-3'>
                <h1>{name}</h1>
                
                <h4>Discription</h4>

                <h3>ราคา { cardPrice } บาท</h3>
              </div>
            </div>
          
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "10px" }}>
  {/* แถวแรก: Mood กับ Size */}
  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: "80px" }}>
    {/* Mood */}
    <div style={{ flex: 1 }}>
      <h5>Mood</h5>
      <ButtonGroup>
        <Button
          className='rounded-4 m-1'
          variant={selectedMood === "Hot" ? "contained" : "outlined"}
          onClick={() => setSelectedMood("Hot")}
        >
          🔥 Hot
        </Button>
        <Button
          className='rounded-pill m-1'
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
            className='rounded-4 m-1'
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
           className='rounded-4 m-1'
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
        {["Bubble", "Jelly", "konjac", "Whisp"].map((topping, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <input
              className='checkbox-menu'
              type="checkbox"
              id={topping}
              value={topping}
              onChange={(e) => handleToppingChange(e.target.value, e.target.checked)}
            />
            <label htmlFor={topping} >{topping}</label>
          </div>
        ))}
      </div>
    </div>
  </div>
  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
    {/* Sugar */}
    <div style={{ flex: 1 }}>
      
    </div>

    {/* Topping */}
    <div style={{ flex: 3 }}>
      <div className="quantity-container">
        <button className="quantity-btn decrease" onClick={handleDecrease}>-</button>
        <span className="quantity-display">{quantity}</span>
        <button className="quantity-btn increase" onClick={handleIncrease}>+</button>
      </div>
    </div>
  </div>
</div>

          </div>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-center'>
        
          <Button className={"rounded-4 m-1 w-25"} style={{ color: "white", background: "red" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button className={"rounded-4 m-1 w-25"} style={{ color: "white", background: "green" }} onClick={handleAddOrder}>
            Done
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


