import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";
import Myimg from '../Image/img';
function CardMenu(image, name, total) {
    const [orders, setOrders] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        // setSelectedOrder(null);
      };
    const [selectedOrder, setSelectedOrder] = useState(null); 
     const [selectedMood, setSelectedMood] = useState(null);
      const [selectedSize, setSelectedSize] = useState("M");
      const [selectedSugar, setSelectedSugar] = useState(50);
      const [quantity, setQuantity] = useState(1);
 
      const [toppings, setToppings] = useState({
        Bubble: false,
        Jelly: false,
        Whisp: false,
        konjac: false,
      });
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
      const handleItemClick = (order) => {
        setSelectedOrder(order);
        setSelectedMood(order.selectedMood || null);
        setSelectedSize(order.selectedSize || "M");
        setSelectedSugar(order.selectedSugar || 50);
        // setName(order.name);
        console.log('order.toppings',order.toppings)
        setToppings(order.toppings || {
          Bubble: false,
          Jelly: false,
          Whisp: false,
          konjac: false,
        });
        setQuantity(order.quantity || 1);
        // setImage(order.img);
        // setPrice(order.price);
        // setTotalPrice(order.total);
        setShow(true);
        {console.log(order)}
      };
    return (
        <>
            <Modal className={"custom-border-modal"}  show={show} onHide={handleClose} backdrop={"static"} centered keyboard >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body >
                <div style={{ textAlign: "left" }}>
                    <div style={{ display: "flex" }}>
                        <Myimg url={image} size={180} />

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
                                                checked={toppings[topping]}
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
        </>
    )
}

export default CardMenu