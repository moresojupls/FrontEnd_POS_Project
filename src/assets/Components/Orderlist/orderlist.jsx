import React, { useEffect, useState } from 'react';
import Mybutton from '../Button/button';
import Pending_Order from '../Pending_Order/Pending_Order';
import { useNavigate } from 'react-router-dom';
import './orderlist.css';

function MyOrderlist() {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);  // ค่าเริ่มต้นเป็น 0
  const [show, setShow] = useState(false);
  const [sum, setSum] = useState(0);

  const handleAddOrder = () => {
    const newOrder = {
      id, name, img, price, selectedMood, selectedSize, selectedSugar, toppings, quantity, total
    };

    const storedOrders = JSON.parse(localStorage.getItem("order_list")) || [];
    storedOrders.push(newOrder);
    localStorage.setItem("order_list", JSON.stringify(storedOrders));

    console.log("Stored Orders after add: ", storedOrders);
    window.dispatchEvent(new Event("storage"));
    setShow(false);
  };

  useEffect(() => {
    const updateTotal = () => {
      const storedOrders = JSON.parse(localStorage.getItem("order_list")) || [];
      const newTotal = storedOrders.reduce((sum, order) => sum + order.total, 0);
      setTotal(newTotal);
      setSum((newTotal + newTotal * 0.07).toFixed(2));  // คำนวณยอดรวมและแสดงผลทศนิยม 2 หลัก
    };

    updateTotal();

    window.addEventListener("storage", updateTotal);

    return () => {
      window.removeEventListener("storage", updateTotal);
    };
  }, []);

  const Mybutton = ({ size, process, topic, color }) => {
    const handleClick = () => {
      process();
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
    <>
      <div className='d-flex Orderlist' style={{ width: '30%' }}>
        <div style={{ width: '100%' }}>
          <h3>Order list</h3>
          <div style={{ display: 'flex', height: '360px' }}>
            <div style={{ width: '100%', height: '100%', border: '2px', marginBottom: '20px', overflow: "scroll", display: 'block' }}>
              <Pending_Order />
            </div>
          </div>

          <div style={{ paddingBottom: '5px' }}>
            <button
              style={{
                width: '100%',
                height: '50px',
                fontSize: '20px',
                fontFamily: 'cursive',
                color: 'green',
                backgroundColor: 'white',
                border: '3.5px solid #FFB38E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px'
              }}
              onClick={() => { alert("Coupon") }}
            >
              Coupon
              <img
                src="https://cdn-icons-png.flaticon.com/512/616/616490.png"
                alt="Coupon Icon"
                style={{ width: '25px', height: '25px' }}
              />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '5px', margin: '10px' }}>
            <p className="mb-2" style={{ fontSize: '25px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ marginRight: '10px' }}>SubTotal:</span>
              <span style={{ marginLeft: '10px' }}>{total.toFixed(2)} บาท</span> {/* แสดงผล total ทศนิยม 2 หลัก */}
            </p>
            <p className="mb-2" style={{ fontSize: '25px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ marginRight: '10px' }}>Tax:</span>
              <span style={{ marginLeft: '10px' }}>{total !== 0 ? (total * 0.07).toFixed(2) : 0} บาท</span> {/* แสดงผล Tax ทศนิยม 2 หลัก */}
            </p>
            <p className="font-bold" style={{ fontSize: '25px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ marginRight: '10px' }}>Total:</span>
              <span style={{ marginLeft: '10px' }}>{sum} บาท</span> {/* แสดงผล Total ทศนิยม 2 หลัก */}
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-evenly', justifyItems: 'center', paddingBottom: '20px', marginTop: '-10px' }}>
            <Mybutton size={"120"}
              process={() => alert("hold order")}
              topic={"Hold Order"}
              color={"#FFB38E"} />

            <Mybutton size={"80"}
              process={() => {
                if (total === 0) return 0;
                navigate('/purchase');
              }}
              topic={"done"}
              color={"#C2F5A1"}
            />
          </div>

        </div>
      </div>
    </>
  );
}

export default MyOrderlist;
