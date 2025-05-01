import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, ButtonGroup } from '@mui/material';
import Myimg from '../Image/img';
import './Pending_order.css';

function Pending_Order() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // เก็บข้อมูลรายการที่คลิก
  const [show, setShow] = useState(false); // state สำหรับ Modal
  const [image,setImage] = useState(null);
  const [name,setName] = useState(null);
  const [price,setPrice]= useState(null);
  const [total,setTotalPrice]= useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedSugar, setSelectedSugar] = useState(50);
  const [toppings, setToppings] = useState({
    Bubble: false,
    Jelly: false,
    Whisp: false,
    konjac: false,
  });
  const [quantity, setQuantity] = useState(1);

  // โหลดข้อมูลจาก localStorage เมื่อ component ถูก mount
  useEffect(() => {
    const fetchOrders = () => {
      const storedOrders = JSON.parse(window.localStorage.getItem("order_list")) || [];
      setOrders(storedOrders);
      console.log('storedOrders',storedOrders)
    };
  
    fetchOrders(); // 🔥 ต้องเรียกตอนแรกเพื่อโหลดข้อมูลที่เคยบันทึกไว้
  
    // ฟัง event 'storage' เพื่อดักการเปลี่ยนแปลงใน localStorage
    window.addEventListener("storage", fetchOrders);
  
    return () => {
      window.removeEventListener("storage", fetchOrders);
    };
  }, []);

  // เมื่อคลิกที่กล่องรายการ
  const handleItemClick = (order) => {
    setSelectedOrder(order);
    setSelectedMood(order.selectedMood || null);
    setSelectedSize(order.selectedSize || "M");
    setSelectedSugar(order.selectedSugar || 50);
    setName(order.name);
    console.log('order.toppings',order.toppings)
    setToppings(order.toppings || {
      Bubble: false,
      Jelly: false,
      Whisp: false,
      konjac: false,
    });
    setQuantity(order.quantity || 1);
    setImage(order.img);
    setPrice(order.price);
    setTotalPrice(order.total);
    setShow(true);
    {console.log(order)}
  };

  // ฟังก์ชันสำหรับลบรายการ
  const handleDelete = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id); // ลบเฉพาะรายการที่ id ไม่ตรงกับที่เลือก
    console.log('id : ', id)
    setOrders(updatedOrders); // อัปเดต State ของ orders
    window.localStorage.setItem("order_list", JSON.stringify(updatedOrders)); // บันทึกการเปลี่ยนแปลงใน localStorage
    window.dispatchEvent(new Event("storage"));
  };


  // บันทึกข้อมูลใหม่ใน localStorage และปิด Modal
  const handleSave = () => {
    if (selectedOrder) {
      const updatedOrder = {
        ...selectedOrder,
        selectedMood,
        selectedSize,
        selectedSugar,
        toppings,
        quantity,
      };
      const updatedOrders = orders.map((order) =>
        order.id === selectedOrder.id ? updatedOrder : order
      );
      setOrders(updatedOrders);
      window.localStorage.setItem("order_list", JSON.stringify(updatedOrders));
      setShow(false);
    }
  };

  // ปิด Modal โดยไม่บันทึก
  const handleClose = () => {
    setShow(false);
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
                border: "solid #ddd",
                borderRadius: "5px",
                backgroundColor: "#fefefe",
              }}>
              {/* ปุ่มลบ */}
              <button
                onClick={() => handleDelete(order.id)} // ลบเมื่อกดปุ่ม
                style={{
                  position: "absolute",
                  top: "2px",
                  right: "2px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "2px",
                  height: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ×
              </button>

              {/* เนื้อหาในกล่อง */}
              <div className='item_pending' onClick={() => handleItemClick(order)} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>

                {/* แสดงรูปเล็กในกล่อง */}
                <img
                
                  src={order.img}
                  alt="Product"
                  style={{ width: "60px", height: "100", borderRadius: "5px", display: "flex", }}
                />
                {/* แสดงรูปเล็กในกล่อง */}
                <div>
                  <p>สินค้า: {order.name}</p>
                  <div style={{display:"inline"}}>
                    <p>จํานวน: {order.amount}</p>
                    <p>ราคา: {order.total} บาท</p>
                  </div>
                </div>


              </div>
            </div>
          ))
        ) : (
          <p>No orders</p>
        )}
      </div>

      {/* Modal สำหรับแสดงข้อมูล */}
      {selectedOrder && (
        // <Modal show={showModal} onHide={handleClose}>
        //   <Modal.Header closeButton>
        //     <Modal.Title>{selectedOrder.name}</Modal.Title>
        //   </Modal.Header>
        //   <Modal.Body>
        //     <div style={{ textAlign: "center" }}>
        //       <img src={selectedOrder.img} alt="" style={{ width: "35%", borderRadius: "8px" }} />
        //       <h3>{selectedOrder.name}</h3>
        //       <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "10px" }}>
        //         {/* Mood */}
        //         <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
        //           <div style={{ flex: 1 }}>
        //             <h5>Mood</h5>
        //             <ButtonGroup>
        //               <Button
        //                 variant={selectedMood === "Hot" ? "contained" : "outlined"}
        //                 onClick={() => setSelectedMood("Hot")}
        //               >
        //                 🔥 Hot
        //               </Button>
        //               <Button
        //                 variant={selectedMood === "Cold" ? "contained" : "outlined"}
        //                 onClick={() => setSelectedMood("Cold")}
        //               >
        //                 ❄️ Cold
        //               </Button>
        //             </ButtonGroup>
        //           </div>

        //           {/* Size */}
        //           <div style={{ flex: 1 }}>
        //             <h5>Size</h5>
        //             <ButtonGroup>
        //               {["S", "M", "L"].map((size) => (
        //                 <Button
        //                   key={size}
        //                   variant={selectedSize === size ? "contained" : "outlined"}
        //                   onClick={() => setSelectedSize(size)}
        //                 >
        //                   {size}
        //                 </Button>
        //               ))}
        //             </ButtonGroup>
        //           </div>
        //         </div>

        //         {/* Sugar */}
        //         <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
        //           <div style={{ flex: 1 }}>
        //             <h5>Sugar</h5>
        //             <ButtonGroup>
        //               {[25, 50, 75, 100].map((level) => (
        //                 <Button
        //                   key={level}
        //                   variant={selectedSugar === level ? "contained" : "outlined"}
        //                   onClick={() => setSelectedSugar(level)}
        //                 >
        //                   {level}%
        //                 </Button>
        //               ))}
        //             </ButtonGroup>
        //           </div>

        //           {/* Topping */}
        //           <div style={{ flex: 1 }}>
        //             <h5>Topping</h5>
        //             <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
        //               {["ไข่มุก", "เยลลี่", "บุก", "วิปครีม"].map((topping, index) => (
        //                 <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        //                   <input
        //                     type="checkbox"
        //                     id={topping}
        //                     value={topping}
        //                     checked={toppings[topping]}
        //                     onChange={(e) => setToppings({ ...toppings, [topping]: e.target.checked })}
        //                   />
        //                   <label htmlFor={topping} style={{ marginLeft: "10px" }}>{topping}</label>
        //                 </div>
        //               ))}
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </Modal.Body>
        //   <Modal.Footer>
          
        //     <Button style={{ color: "white", background: "red" }} onClick={handleClose}>
        //       Cancel
        //     </Button>
        //     <Button style={{ color: "white", background: "green" }} onClick={handleSave}>
        //       Save Changes
        //     </Button>
        //   </Modal.Footer>
        // </Modal>
      <Modal className={"custom-border-modal"} show={show} onHide={handleClose}  backdrop={"static"} centered keyboard >
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body >
                <div style={{ textAlign: "left" }}>
                  <div style={{display:"flex"}}>
                    <Myimg url={image} size={180}/>
                    
                    <div className='m-3'>
                      <h1>{name}</h1>
                      
                      <h4>Discription</h4>
      
                      <h3>ราคา {total} บาท</h3>
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
              {[
      "Bubble",
      "Jelly",
      "konjac",
      "Whisp",
     
    ].map((topping, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                  <input
                    className='checkbox-menu'
                    type="checkbox"
                    id={topping}
                    value={topping}
                    onChange={(e) => setToppings(e.target.value, e.target.checked)}
                    checked ={toppings[topping]}
                  />
                  <label htmlFor={topping} >{topping}</label>
                </div>
              ))}
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
                <Button className={"rounded-4 m-1 w-20"} style={{ color: "white", background: "green" }} onClick={handleSave}>
                  Save changes
                </Button>
              </Modal.Footer>
            </Modal>
      )}
    </div>
  );
}

export default Pending_Order;
