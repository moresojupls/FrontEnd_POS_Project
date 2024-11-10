import { AddBox } from '@mui/icons-material'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react';
import MyCard from '../Card_Menu/Card';

function Pending_Order() {
    const [resultJson, setResultJson] = useState({});

  
    useEffect(() => {
      // ฟังก์ชันที่ดึงข้อมูลจาก localStorage
      const fetchOrder = () => {
        const res = window.localStorage.getItem('result_order');
        if (res) {
          setResultJson(JSON.parse(res));
        }
      };
  
      // ฟัง event 'storage' ที่ถูก trigger ใน MyCard เมื่อมีการบันทึกข้อมูล
      window.addEventListener('storage', fetchOrder);
  
      // เรียก fetchOrder เมื่อ component โหลดครั้งแรก
      fetchOrder();
  
      // ล้าง event listener เมื่อ component ถูกทำลาย
      return () => {
        window.removeEventListener('storage', fetchOrder);
      };
    }, []);
  
    return (
      <>
      <div style={{ width: '100%', height: '20px', backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}>
        {resultJson && resultJson.name ? (
          <>
          <button style={{width:'100%'}}>
            <p>สินค้า: {resultJson.name}</p>
            <p>ราคา: {resultJson.price} บาท</p>
          </button>
          </>
        ) : (
          <p>No order</p>
        )}
      </div>
      </>
    );
  }
  
  export default Pending_Order;
    
  
  



// function Pending_Order() {
//     const [state,dispath] = useReducer(Reducer,{id:41})
//     const [resultJson,setresultJson] = useState({});
//     const id = useId();

 

//     useEffect(()=>{
//         if(window.localStorage.getItem('result_order')!==null){
//             let res = (window.localStorage.getItem('result_order'));
//             console.log('res : ',res.id)
//             setresultJson(JSON.parse(res))  
//         }
       
//     },[window.localStorage.getItem('result_order')!==null])
    

   
//    console.log("id : ",id)

  

//   )
// }

// export default Pending_Order
