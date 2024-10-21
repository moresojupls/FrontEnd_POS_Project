import React from 'react'
import Mybutton from '../Button/button'
import { Margin } from '@mui/icons-material'
import Pending_Order from '../Pending_Order/Pending_Order'
import { Container } from 'react-bootstrap'

function MyOrderlist() {


  return (
    <div className = 'd-flex ' style={{outlineStyle: 'auto', width:'29.55%', color:'black' ,background:'white'}}>
      <div style={{alignContent:'end',alignItems:'center',width:'100%'}}> 

        <h2 style={{fontFamily:'fantasy'}}>Order list</h2>
        <div style={{display:'flex',justifyContent:'center',justifyItems:'center'}}>
          <div style={{width:'550px',height:'500px',borderStyle:'solid',border:'2px',outlineStyle:'auto',marginBottom:'20px'}}>
            <Pending_Order/>
          </div>
        </div>

        <div style={{paddingBottom:'30px'}}>
          <button style={{width:'500px',height:'60px',fontSize:'20px',fontFamily:'cursive'}} onClick={()=>{alert("Coupon")}}> Coupon </button>
        </div>

        <div style={{display: 'flex',flexDirection:'column',justifyContent:'center',paddingBottom:'20px'}}>
        <p className="mb-2" style={{fontSize:'25px'}}>SubTotal: 45 บาท</p>
        <p className="mb-2" style={{fontSize:'25px'}}>Tax: 5 บาท</p>
        <p className="font-bold" style={{fontSize:'25px'}}>Total: 50 บาท</p>
        </div>

        <div style={{display: 'flex',justifyContent: 'center', gap: '60px', marginTop: 'auto',paddingBottom:'30px' }}>
        <Mybutton process={()=>{
          alert("hold order")
        }} topic={"Hold Order"}/>

        <Mybutton process={()=>{
          alert("done")
        }} topic={"Done"}/>
        </div>

      </div>
    </div>
  )
}

export default MyOrderlist