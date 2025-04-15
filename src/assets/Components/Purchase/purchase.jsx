import React, { useEffect, useState } from 'react';
import Myimg from '../Image/img';
import image from "../../image";
import { useNavigate } from 'react-router-dom';
import Numpad from '../Numpad/Numpad'; // ✅ นำเข้า Numpad
import pako from 'pako';


function Purchase() {
  const [orders, setOrders] = useState([]);
  const [showQrImage, setShowQrImage] = useState(false);
  const [showNumpad, setShowNumpad] = useState(false); // ✅ state ควบคุมการแสดง numpad
  const totalAmount = orders.reduce((sum, order) => sum + order.amount, 0);
  const newTotal = orders.reduce((sum, order) => sum + order.total, 0);
  const navigate = useNavigate();
  const user =  JSON.parse(localStorage.getItem("user")) ;
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("order_list")) || [];
    storedOrders.forEach(element => {
      const topping = [];
      element.menu = element.name
      element.size = "M"
     console.log('element ',element.toppings)
     Object.keys(element.toppings).forEach((res)=>{
      console.log('ele',element.toppings[res])
      if(element.toppings[res]== true ) topping.push(element.toppings[res]== true ? res:'')
     })
     element.toppings = topping
     console.log('element ',element)

  
    });
    
    setOrders(storedOrders);
    
  }, []);

 
  const obj = {
    "Transaction_id": 1,
    "Employee_id": user.result.id,
    "Product_detail": "dsad",
    "Quantity": totalAmount+(totalAmount*0.07),
    "Total_price": newTotal,

  }
  // if(orders.length > 0 ){
   
  //   const compressed = pako.deflate(JSON.stringify(orders));
  //   const a = btoa(String.fromCharCode(...compressed));
   

  //   // const decompressed = Uint8Array.from(atob(a), c => c.charCodeAt(0));
  //   // const decompressedString = pako.inflate(decompressed,{to:"string"});
  //   // console.log('decompressedString ',JSON.parse(decompressedString))

  // }

  const payment = (obj)=>{
    // compressed
 
    console.log('obj ss',orders)
    const compressed = pako.deflate(JSON.stringify(orders));
    //base 64
    const base64data = btoa(String.fromCharCode(...compressed));
    obj.Product_detail = base64data
    fetch("http://127.0.0.1:4000/Transactions/create",{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(obj)
    }).then((res)=>{
      if(res.status == 200){
        console.log("Success")
      }
    }).catch((res)=>{
      if(res.status == 404){
        console.log('Not Found')
      }
    }).finally(()=>{
      navigate('/FrontEnd_POS_Project');
    })
  }

  // ฟังก์ชันที่จัดการการชำระเงิน
  const handlePayment = (type) => {
    if (type === "Qrcode") {
      setShowQrImage(true);
      setShowNumpad(false);
    } else if (type === "cash") {
      setShowNumpad(true);
      setShowQrImage(false);
    } else {
      setShowQrImage(false);
      setShowNumpad(false);
    }
  };

  return (
    <div className="purchase-container" style={{ padding: "20px" }}>
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px' }}>
        <button
          style={{
            width: "80px",
            backgroundColor: "#6495ED",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            color: "#fff",
          }}
          onClick={() => navigate('/FrontEnd_POS_Project')}
        >
          Back
        </button>
      </div>

      {/* รายการสั่งซื้อ */}
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          border: '2px solid #B17457',
          borderRadius: '5px',
          width: '50%',
          maxHeight: '400px',
          overflowY: 'auto',
          marginTop: '10px',
          padding: '10px',
        }}>
          <h3>Purchase Orders</h3>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={index} style={{
                border: '2px solid #A91006',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
                margin: '10px 0',
                padding: '10px',
                borderRadius: '5px',
              }}>
                <p>สินค้า: {order.name}</p>
                <p>จำนวน: {order.amount}</p>
                <p>ราคา: {order.total}</p>
              </div>
            ))
          ) : (
            <p>No orders</p>
          )}
        <h3>ยอดรวม:  {newTotal+(newTotal*0.07) } บาท</h3>
        </div>

        {/* QR Code Display */}
        {showQrImage && (
          <div style={{ marginLeft: "20px", display: "flex", justifyContent: 'center', alignItems: "center" }}>
            <Myimg size={400} url={image.promptpay_Champ} />
          </div>
        )}

        {/* แสดง numpad เมื่อเลือก cash */}
        {showNumpad && (
        <div style={{ marginLeft: "20px", display: "flex", justifyContent: 'center', alignItems: "center" }}>
          <Numpad />
        </div>
        )}
        
      </div>
      
      <section className="payment-buttons" style={{ display: "flex",gap: "20px", marginTop: "20px" }}>
        {["cash", "Qrcode", "atmcard"].map((type) => (
          <button
            key={type}
            style={{
              backgroundColor: "#FFE8AD",
              border: "2px solid #F27951",
              borderRadius: "8px",
              padding: "12px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
            onClick={() => handlePayment(type)}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#FFD37D"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#FFE8AD"}
          >
            <Myimg size={60} url={image[type]} />
            <div style={{ fontSize: "14px", color: "#333", marginTop: "5px" }}>
              {type === "Qrcode" ? "QR Payment" : type.charAt(0).toUpperCase() + type.slice(1)}
            </div>
          </button>
        ))}
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px' }}>
        <button
          style={{
            width: "80px",
            backgroundColor: "green",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            color: "#fff",
          }}
          onClick={() => {
           console.log('obj ',obj)
            if(orders.length < 0 ) return 
            if(obj.Employee_id != null || obj.Employee_id != undefined) payment(obj);
         
          }}
        >
          Success
        </button>
      </div>
      </section>
      

    </div>
  );
}

export default Purchase;