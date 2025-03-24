import React, { useEffect, useState } from 'react';
import Myimg from '../Image/img';
import image from "../../image";
import { useNavigate } from 'react-router-dom';
import Numpad from '../Numpad/Numpad'; // ✅ นำเข้า Numpad


function Purchase() {
  const [orders, setOrders] = useState([]);
  const [showQrImage, setShowQrImage] = useState(false);
  const [showNumpad, setShowNumpad] = useState(false); // ✅ state ควบคุมการแสดง numpad
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("order_list")) || [];
    setOrders(storedOrders);
  }, []);

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
        <h3>ยอดรวม: {orders.reduce((sum, order) => sum + order.total, 0)} บาท</h3>
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
      </section>

    </div>
  );
}

export default Purchase;