import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "@mui/material";

function Pending_Order() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // เก็บข้อมูลรายการที่คลิก
  const [showModal, setShowModal] = useState(false); // state สำหรับ Modal

  // โหลดข้อมูลจาก localStorage เมื่อ component ถูก mount
  useEffect(() => {
    const fetchOrders = () => {
      const storedOrders = JSON.parse(window.localStorage.getItem("order_list")) || [];
      setOrders(storedOrders);
    };

    fetchOrders();

    // ฟัง event 'storage' เพื่อดักการเปลี่ยนแปลงใน localStorage
    window.addEventListener("storage", fetchOrders);

    return () => {
      window.removeEventListener("storage", fetchOrders);
    };
  }, []);

  // เมื่อคลิกที่กล่องรายการ
  const handleItemClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true); // เปิด Modal
  };

  // ฟังก์ชันสำหรับลบรายการ
  const handleDelete = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id); // ลบเฉพาะรายการที่ id ไม่ตรงกับที่เลือก
    console.log('id : ',id)
    setOrders(updatedOrders); // อัปเดต State ของ orders
    window.localStorage.setItem("order_list", JSON.stringify(updatedOrders)); // บันทึกการเปลี่ยนแปลงใน localStorage
  };
  

  // บันทึกข้อมูลใหม่ใน localStorage และปิด Modal
  const handleSave = () => {
    if (selectedOrder !== null) {
      const updatedOrders = orders.map((order) =>
        order.id === selectedOrder.id ? selectedOrder : order
      );
      setOrders(updatedOrders);
      window.localStorage.setItem("order_list", JSON.stringify(updatedOrders)); // บันทึกใน localStorage
      setShowModal(false);
    }
  };

  // ปิด Modal โดยไม่บันทึก
  const handleClose = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  return (
    <div style={{ padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "5px" }}>
      <div style={{ width: "100%", backgroundColor: "white", padding: "10px", borderRadius: "5px" }}>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div
              key={index}
              style={{
                position: "relative", // สำหรับวางปุ่มลบ
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                backgroundColor: "#fefefe",
              }}
            >
              {/* ปุ่มลบ */}
              <button
                onClick={() => handleDelete(order.id)} // ลบเมื่อกดปุ่ม
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px",
                  cursor: "pointer",
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ×
              </button>

              {/* เนื้อหาในกล่อง */}
              {console.log("order : ",order)}
              <div onClick={() => handleItemClick(order)} style={{ cursor: "pointer" }}>
                <p>สินค้า: {order.name } </p>
                <p>จํานวน: {order.amount !== undefined ?order.amount : 0 } </p>
                <p>ราคา: {order.price} บาท</p>
              </div>
            </div>
          ))
        ) : (
          <p>No orders</p>
        )}
      </div>

      {/* Modal สำหรับแสดงข้อมูล */}
      {selectedOrder && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedOrder.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ textAlign: "center" }}>
              <img
                src={selectedOrder.img}
                alt=""
                style={{ width: "100%", borderRadius: "8px", marginBottom: "10px" }}
              />
              <div>
                <label>สินค้า {selectedOrder.name}</label>
                <br></br>
                <label>จํานวน:</label>
                <input
                  type="number"
                  value={selectedOrder.amount}
                  onChange={(e) =>
                    setSelectedOrder({ ...selectedOrder, amount: e.target.value })
                  }
                  style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
                />
                <label>ราคา:</label>
                <input
                  type="number"
                  value={selectedOrder.price}
                  onChange={(e) =>
                    setSelectedOrder({ ...selectedOrder, price: e.target.value })
                  }
                  style={{ width: "100%", padding: "5px" }}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button style={{ backgroundColor: "green", color: "white" }} onClick={handleSave}>
              Save Changes
            </Button>
            <Button style={{ backgroundColor: "red", color: "white" }} onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default Pending_Order;
