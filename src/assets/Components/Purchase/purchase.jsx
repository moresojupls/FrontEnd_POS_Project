import React, { useEffect, useState } from 'react';
import Myimg from '../Image/img';
import image from "../../image";
import { useNavigate } from 'react-router-dom';
import Numpad from '../Numpad/Numpad';

function Purchase() {
  const [orders, setOrders] = useState([]);
  const [showQrImage, setShowQrImage] = useState(false);
  const [showNumpad, setShowNumpad] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("order_list")) || [];
    setOrders(storedOrders);
  }, []);

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
          <h3 style={{ marginTop: 0 }}>รายการสั่งซื้อ</h3>
          
          <div style={{
            flex: 1,
            overflowY: 'auto',
            marginBottom: '15px'
          }}>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <div key={index} style={{
                  border: '2px solid #A91006',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '10px 0',
                  padding: '10px',
                  borderRadius: '5px',
                }}>
                  <p>สินค้า: {order.name}</p>
                  <p>จำนวน: {order.amount}</p>
                  <p>ราคา: {order.total} บาท</p>
                </div>
              ))
            ) : (
              <p>ไม่มีรายการสินค้า</p>
            )}
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
      </div>
    </div>
  );
}

export default Purchase;