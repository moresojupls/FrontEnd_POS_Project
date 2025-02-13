import React, { useEffect,useReducer, useState,useMemo} from 'react'
import Mybutton from '../Button/button'
import { Margin } from '@mui/icons-material'
import Pending_Order from '../Pending_Order/Pending_Order'
import { Container } from 'react-bootstrap'
import './orderlist.css';
import img from '../../image';
import Myimg from '../Image/img'
import { useNavigate } from 'react-router-dom';

function MyOrderlist() {

  // useEffect(()=>{
  //   window.location.pathname.split('/')[2] == 'product' ? setUrl(true):setUrl(false)
  //   console.log('url ', window.location.pathname.split('/')[2])
  // },[])
  const navigate = useNavigate(); // ใช้ hook สำหรับการ Redirect

  const handleAddOrder = () => {
    const newOrder = {
      id, name, img, price, selectedMood, selectedSize, selectedSugar, toppings, quantity, total
    };
    
    const storedOrders = JSON.parse(localStorage.getItem("order_list")) || [];
    storedOrders.push(newOrder);  // เพิ่มคำสั่งซื้อลงไปใน array
    localStorage.setItem("order_list", JSON.stringify(storedOrders));  // บันทึกกลับลง localStorage
    
    console.log("Stored Orders after add: ", storedOrders);  // ตรวจสอบข้อมูลที่บันทึก
  
    window.dispatchEvent(new Event("storage"));  // แจ้ง Pending_Order ว่ามีการอัพเดต
    setShow(false);
  };
  
  

  const Mybutton = ({ size, process, topic, color, redirectTo }) => {
    //const history = useHistory(); // ใช้ useHistory สำหรับการ redirect
  
    const handleClick = () => {
      process(); // เรียกฟังก์ชัน process ที่ส่งเข้ามา (เช่น alert)
      if (redirectTo) {
        history.push(redirectTo); // redirect ไปยัง path ที่กำหนด
      }
    };
  
    const buttonStyle = {
      width: `${size}px`, // ✅ ใช้ backticks (``) ครอบ ${size}
      backgroundColor: color, 
      padding: '10px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      color: '#fff',
    };
    

    return (
        <button style={buttonStyle} onClick={process}>
            {topic}
        </button>
    );
};

  return (
    <>
      <div className = 'd-flex Orderlist ' style={{ width:'30%', }}>
        <div style={{width:'100%'}}> 
  
          <h2 >Order list</h2>
          <div style={{display:'flex',height:'360px'}}>
            <div style={{width:'100%',height:'100%',border:'2px',marginBottom:'20px',overflow:"scroll",display:'block'}}>
              <Pending_Order/>
            </div>
          </div>
  
          <div style={{ paddingBottom: '5px' }}>
    <button 
    style={{
      width: '100%', 
      height: '50px', 
      fontSize: '20px', 
      fontFamily: 'cursive',
      color:'green',
      backgroundColor: 'white',
      border: '3.5px solid #FFB38E',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      gap: '10px' // เว้นระยะระหว่างรูปกับข้อความ
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
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '5px',margin:'10px' }}>
        <p className="mb-2" style={{ fontSize: '25px', display: 'flex' ,justifyContent: 'space-between'}}>
          <span style={{ marginRight: '10px' }}>SubTotal:</span>
          <span style={{ marginLeft: '10px' }}>45 บาท</span>
        </p>
        <p className="mb-2" style={{ fontSize: '25px', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ marginRight: '10px' }}>Tax:</span>
          <span style={{ marginLeft: '10px' }}>5 บาท</span>
        </p>
        <p className="font-bold" style={{ fontSize: '25px', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ marginRight: '10px' }}>Total:</span>
          <span style={{ marginLeft: '10px' }}>50 บาท</span>
        </p>
        </div>

        <div style={{display:'flex',justifyContent:'space-evenly',justifyItems:'center',paddingBottom:'20px',marginTop:'-10px'}}>
        <Mybutton size={"120"} 
          process={() => alert("hold order")} 
          topic={"Hold Order"}
          color={"#FFB38E"}/>
        
        <Mybutton size={"80"} 
        process={() => { 
          navigate('/purchase'); // ⬅️ เมื่อกด Done ให้เปลี่ยนหน้า
        }} 
        topic={"done"}
        color={"#C2F5A1"}
      />
    </div>

          
  
        </div>
      </div>
    </>
    )  
}

export default MyOrderlist