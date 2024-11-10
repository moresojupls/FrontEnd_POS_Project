import React, { useEffect,useReducer, useState,useMemo} from 'react'
import Mybutton from '../Button/button'
import { Margin } from '@mui/icons-material'
import Pending_Order from '../Pending_Order/Pending_Order'
import { Container } from 'react-bootstrap'

function MyOrderlist() {

  // useEffect(()=>{
  //   window.location.pathname.split('/')[2] == 'product' ? setUrl(true):setUrl(false)
  //   console.log('url ', window.location.pathname.split('/')[2])
  // },[])

  return (
    <>
      <div className = 'd-flex ' style={{outlineStyle: 'auto', width:'20%', color:'black' ,background:'white'}}>
        <div style={{width:'100%'}}> 
  
          <h2 >Order list</h2>
          <div style={{display:'flex',height:'360px'}}>
            <div style={{width:'100%',height:'100%',borderStyle:'solid',border:'2px',outlineStyle:'auto',marginBottom:'20px',overflow:"scroll",display:'block'}}>
              <Pending_Order/>
            </div>
          </div>
  
          <div style={{paddingBottom:'5px'}}>
            <button style={{width:'100%',height:'50px',fontSize:'20px',fontFamily:'cursive'}} onClick={()=>{alert("Coupon")}}> Coupon </button>
          </div>
  
          <div style={{display: 'flex',flexDirection:'column',justifyContent:'center',paddingBottom:'5px'}}>
          <p className="mb-2" style={{fontSize:'25px'}}>SubTotal: 45 บาท</p>
          <p className="mb-2" style={{fontSize:'25px'}}>Tax: 5 บาท</p>
          <p className="font-bold" style={{fontSize:'25px'}}>Total: 50 บาท</p>
          </div>
  
          <div style={{display:'flex',justifyContent:'space-evenly',justifyItems:'center',  marginTop: 'auto',paddingBottom:'20px' }}>
          <Mybutton size={"120"} process={()=>{
            alert("hold order")
          }} topic={"Hold Order"}/>
  
          <Mybutton size={"80"}process={()=>{
            alert("done")
          }} topic={"Done"}/>
          </div>
  
        </div>
      </div>
    </>
    )  


  

  
  
}

export default MyOrderlist