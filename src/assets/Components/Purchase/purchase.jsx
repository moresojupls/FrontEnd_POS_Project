import React, { useEffect, useState } from 'react';
import Myimg from '../Image/img';
import image from "../../image";
import { useNavigate } from 'react-router-dom';
import Numpad from '../Numpad/Numpad';

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
    setOrders(storedOrders);
  }, []);

 

  const payment = ()=>{
    console.log('user ',user)
    fetch("http://127.0.0.1:4000/Transactions/create",{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify({
        "Transaction_id": 1,
        "Employee_id": user.id,
        "Product_id": 1,
        "Quantity": totalAmount+(totalAmount*0.07),
        "Total_price": newTotal,

      })
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

  // คำนวณยอดรวมทั้งหมด
  const totalAmount = orders.reduce((sum, order) => sum + order.total, 0);
  const totalWithVat = (totalAmount * 0.07) + totalAmount;

  return (
    <div className="purchase-container" style={{ 
      padding: "20px 20px 20px 0", // ลบ padding ด้านซ้าย
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      boxSizing: 'border-box'
    }}>
      {/* ปุ่มกลับ */}
      <button
      style={{
        width: "80px",
        backgroundColor: "#6495ED",
        padding: "10px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        color: "#fff",}}
          onClick={() => navigate('/FrontEnd_POS_Project')}
        >
        กลับ
      </button>

      {/* ส่วนแสดงผลหลัก */}
      <div style={{ 
        display: 'flex', 
        flex: 1,
        gap: '20px',
        minHeight: 0 // สำหรับการจัดการ overflow
      }}>
        {/* รายการสินค้า */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          border: '2px solid #B17457',
          borderRadius: '5px',
          padding: '15px',
          overflow: 'hidden'
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

          <div style={{
            borderTop: '1px solid #ccc',
            paddingTop: '10px',
            marginTop: 'auto'
          }}>
            <h3>ยอดรวม: {totalWithVat.toFixed(2)} บาท</h3>
          </div>
        </div>

        {/* ส่วนแสดง QR Code หรือ Numpad */}
        <div style={{
          width: '400px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '2px solid #ddd',
          borderRadius: '5px',
          padding: '20px'
        }}>
          {showQrImage ? (
            <Myimg size={350} url={image.promptpay_Champ} />
          ) : showNumpad ? (
            <Numpad />
          ) : (
            <p style={{ color: '#666' }}>เลือกวิธีการชำระเงิน</p>
          )}
        </div>
        )}
        
      </div>

      {/* ปุ่มชำระเงิน */}
      <div style={{ 
        display: "flex",
        gap: "20px", 
        marginTop: "20px",
        justifyContent: 'center'
      }}>
        {["cash", "Qrcode", "atmcard"].map((type) => (
          <button
            key={type}
            style={{
              backgroundColor: "#FFE8AD",
              border: "2px solid #F27951",
              borderRadius: "8px",
              padding: "12px",
              fontWeight: "bold",
              cursor: "pointer",
              width: '120px'
            }}
            onClick={() => handlePayment(type)}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#FFD37D"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#FFE8AD"}
          >
            <Myimg size={60} url={image[type]} />
            <div style={{ fontSize: "14px", color: "#333", marginTop: "5px" }}>
              {type === "Qrcode" ? "QR Payment" : 
               type === "cash" ? "เงินสด" : "บัตร ATM"}
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
            payment();
            
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