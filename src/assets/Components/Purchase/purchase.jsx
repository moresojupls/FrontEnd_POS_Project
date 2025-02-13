import React, { useEffect, useState } from 'react';
import Myimg from '../Image/img';
import image from "../../image";
import { useNavigate } from 'react-router-dom';

function Purchase() {
  const [orders, setOrders] = useState([]); // เพิ่มการประกาศ setOrders
  const [showQrImage, setShowQrImage] = useState(false); // state สำหรับควบคุมการแสดงภาพ QR
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("order_list")) || [];
    setOrders(storedOrders);  // ตั้งค่าจาก localStorage
  }, []);

  // ฟังก์ชันที่จัดการการชำระเงินและการแสดงภาพ QR
  const handlePayment = (type) => {
    if (type === "Qrcode") {
      setShowQrImage(true); // เมื่อเลือก QR Payment ให้แสดงภาพ
    } else {
      setShowQrImage(false); // ซ่อนภาพ QR เมื่อเลือกการชำระเงินแบบอื่น
    }
  };

  // ปุ่มกลับ
  const Mybutton = ({ size, process, topic, color }) => {
    const handleClick = () => {
      process(); // เรียกฟังก์ชัน process ที่ส่งเข้ามา (เช่น alert)
    };

    const buttonStyle = {
      width: `${size}px`, 
      backgroundColor: color, 
      padding: '10px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      color: '#fff',
    };

    return (
      <button style={buttonStyle} onClick={handleClick}>
        {topic}
      </button>
    );
  };

  return (
    <div className="purchase-container" style={{ padding: "20px" }}>
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px' }}>
        <Mybutton
          size={"80"}
          process={() => {
            navigate('/FrontEnd_POS_Project'); // ⬅️ เมื่อกด Done ให้เปลี่ยนหน้า
          }}
          topic={"Back"}
          color={"#6495ED"}
        />
      </div>

    {/* รายการสั่งซื้อ และภาพ QR Payment */}
    <div style={{display:'flex',flexDirection:'row'}}>
<       div style={{
            display: "flex",  // ใช้ Flexbox เพื่อให้เป็นแถว
            justifyContent: "space-between",  // ทำให้รายการอยู่ทางซ้ายและภาพ QR ไปทางขวา
            alignItems: "center",  // จัดให้อยู่ในแนวเดียวกัน
            border: '2px solid #B17457',
            borderRadius: '5px',
            width: '50%',
            maxHeight: '1000px',
            overflowY: 'auto',
            marginTop: '10px',
            padding: '10px',
        }}>
        {/* รายการสั่งซื้อ */}
        <div style={{ flex: 1 }}> {/* ทำให้รายการสั่งซื้ออยู่ทางซ้าย */}
            <h3>Purchase Orders</h3>
            {orders.length > 0 ? (
            orders.map((order, index) => (
                <div
                key={index}
                style={{
                    border: '2px solid #A91006',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '10px',
                    margin: '10px 0',
                    padding: '10px',
                    borderRadius: '5px',
                }}
                >
                <p>สินค้า: {order.name}</p>
                <p>จำนวน: {order.amount}</p>
                <p>ราคา: {order.total}</p>
                </div>
            ))
            ) : (
            <p>No orders</p>
            )}
        </div>

        </div>
        <div>
            {/* เมื่อเลือก QR Payment จะแสดงรูปภาพ QR */}
        {showQrImage && (
            <div style={{ marginLeft: "20px", display: "flex",justifyContent:'center',alignItems: "center", }}> {/* ขยับให้ภาพอยู่ห่างจากรายการเล็กน้อย */}
            <Myimg size={400} url={image.promptpay_Champ} />
            </div>
        )}
        </div>
    </div>
      <br />
      <br />
      <br />

      {/* ปุ่มชำระเงิน */}
      <section className="payment-buttons" style={{ display: "flex", justifyContent: "flex-start", flexDirection: 'row', gap: "20px" }}>
        {["cash", "Qrcode", "atmcard"].map((type) => (
          <button
            key={type}
            className="btn"
            style={{
              backgroundColor: "#FFE8AD",
              border: "2px solid #F27951",
              borderRadius: "8px",
              padding: "12px",
              fontWeight: "bold",
              transition: "background-color 0.3s",
              cursor: "pointer"
            }}
            onClick={() => handlePayment(type)} // ใช้ handlePayment ที่ประกาศใน component หลัก
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#FFD37D"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#FFE8AD"}
          >
            <Myimg size={60} url={image[type]} />
            <div style={{ fontSize: "14px", color: "#333", marginTop: "5px" }}>
              {type === "Qrcode" ? "QR Payment" : type.charAt(0).toUpperCase() + type.slice(1)}
            </div>
          </button>
        ))}
      </section>
    </div>
  );
}

export default Purchase;