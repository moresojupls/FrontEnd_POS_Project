import React, { useEffect, useState } from 'react';
import Myimg from '../Image/img';
import image from "../../image";
import { useNavigate } from 'react-router-dom';
import Numpad from '../Numpad/Numpad';
import pako from 'pako';
import { jsPDF } from "jspdf";
import { Modal, Button } from 'antd'; // นำเข้า Modal และ Button

function Purchase() {
  const [orders, setOrders] = useState([]);
  const [showQrImage, setShowQrImage] = useState(false);
  const [showNumpad, setShowNumpad] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // สถานะการแสดง Modal
  const totalAmount = orders.reduce((sum, order) => sum + order.amount, 0);
  const newTotal = orders.reduce((sum, order) => sum + order.total, 0);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [employeeName, setEmployeeName] = useState('');

  // Load orders from localStorage and parse toppings
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("order_list")) || [];
    storedOrders.forEach(element => {
      const topping = [];
      element.menu = element.name;
      element.size = "M";
      Object.keys(element.toppings).forEach(res => {
        if (element.toppings[res] === true) topping.push(res);
      });
      element.toppings = topping;
    });
    setOrders(storedOrders);
  }, []);

  // Fetch employee name based on user ID
  useEffect(() => {
    const fetchEmployeeName = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user")) || null;
        const response = await fetch(`http://127.0.0.1:4000/employees/employees/${user.result.id}`);
        const data = await response.json();
        setEmployeeName(data.result[0]?.employee_name);
      } catch (error) {
        console.error("Failed to fetch employee name", error);
      }
    };

    fetchEmployeeName();
  }, []);

  // Object to send in payment request
  const obj = {
    "Transaction_id": 1,
    "Employee_id": user?.result?.id,
    "Product_detail": "",
    "Quantity": totalAmount + (totalAmount * 0.07),
    "Total_price": newTotal,
  };

  // Generate PDF Receipt
  const generatePDF = (orders, total, employeeName) => {
    const doc = new jsPDF();
    
    // Title - Centered, Bold, and Larger font size
    doc.setFontSize(26);
    doc.setFont("helvetica", "bold");
    doc.text("Purchase Order Receipt", 105, 30, null, null, 'center');
    
    // Divider Line
    doc.line(10, 35, 200, 35);
    
    // Order Details Section
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
  
    // Order Info (Transaction ID, Date, Cashier Name)
    doc.text(`Order ID: #${obj.Transaction_id}`, 14, 45);
    doc.text(`Date: ${new Date().toLocaleString()}`, 14, 53);
    doc.text(`Cashier: ${employeeName || "Unknown"}`, 14, 61);
    
    // Divider Line
    doc.line(10, 64, 200, 64);
    
    // Order Items
    let y = 70;
    orders.forEach((order, index) => {
      doc.setFontSize(12);
      doc.text(`${index + 1}. ${order.name}`, 14, y);
      doc.text(`Qty: ${order.amount} x ${order.total / order.amount} THB`, 14, y + 6);
      doc.text(`Subtotal: ${order.total.toFixed(2)} THB`, 150, y + 6, null, null, 'right');
      y += 16;
    });
    
    // Divider Line
    doc.line(10, y, 200, y);
    y += 6;
  
    // Total Section with VAT
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Total (with 7% VAT):`, 14, y);
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(`${total.toFixed(2)} THB`, 150, y, null, null, 'right');
    y += 18;
  
    // Footer Text
    doc.setFontSize(12);
    doc.setFont("helvetica", "italic");
    doc.text("Thank you for your purchase!", 70, y);
  
    // Save PDF
    doc.save("receipt.pdf");
  };

  // Handle payment process
  const payment = (obj) => {
    if (orders.length === 0) {
      alert('No orders to process');
      return;
    }

    // Check that all order totals are valid numbers
    const validOrders = orders.every(order => typeof order.total === 'number' && !isNaN(order.total));
    if (!validOrders) {
      alert('Invalid order total');
      return;
    }

    const compressed = pako.deflate(JSON.stringify(orders));
    const base64data = btoa(String.fromCharCode(...compressed));
    obj.Product_detail = base64data;

    fetch("http://127.0.0.1:4000/Transactions/create", {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(obj)
    }).then((res) => {
      if (res.status === 200) {
        // Clear order list after successful payment
        localStorage.removeItem("order_list");
        setOrders([]);  // Clear the local state of orders
      }
    }).catch((res) => {
      if (res.status === 404) {
        console.log('Not Found');
      }
    }).finally(() => {
      setIsModalVisible(true); // Open Modal when payment is complete
    });
  };

  // Handle payment method selection
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

  // Handle modal confirmation
  const handleModalOk = () => {
    setIsModalVisible(false);
    navigate('/FrontEnd_POS_Project/product/favourite');
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

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          border: '2px solid #B17457',
          borderRadius: '5px',
          width: '50%',
          height: '500px',
          overflowY: 'auto',
          marginTop: '10px',
          padding: '10px',
        }}>
          <h3>Purchase Orders</h3>
          <div style={{ flexGrow: 1 }}>
            {orders.length > 0 ? (
              orders.slice(0, 5).map((order, index) => (
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
          </div>
          <h3 style={{ marginTop: 'auto' }}>
            ยอดรวม: {(newTotal + (newTotal * 0.07)).toFixed(2)} บาท
          </h3>
        </div>

        {showQrImage && (
          <div style={{ marginLeft: "20px", display: "flex", justifyContent: 'center', alignItems: "center" }}>
            <Myimg size={400} url={image.promptpay_Champ} />
          </div>
        )}

        {showNumpad && (
          <div style={{ marginLeft: "20px", display: "flex", justifyContent: 'center', alignItems: "center" }}>
            <Numpad />
          </div>
        )}
      </div>

      <section className="payment-buttons" style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
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
              if (orders.length <= 0) return; // Ensure there's an order to process
              if (obj.Employee_id != null || obj.Employee_id != undefined) {
                payment(obj); // Process payment and clear orders
                generatePDF(orders, newTotal + (newTotal * 0.07), employeeName);
              }
            }}
          >
            Success
          </button>
        </div>
      </section>

      {/* Modal ที่แสดงเมื่อดาวน์โหลด PDF เสร็จสิ้น */}
      <Modal
        title="Receipt Downloaded"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
        okText="Done"
      >
        <p>Receipt has been downloaded successfully. Click 'Done' to return to Salepage.</p>
      </Modal>
    </div>
  );
}

export default Purchase;
