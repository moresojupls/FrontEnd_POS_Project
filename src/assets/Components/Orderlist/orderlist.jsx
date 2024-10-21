import React from 'react'
import Mybutton from '../Button/button'
import { Margin } from '@mui/icons-material'

function MyOrderlist() {
  return (
    <div className = 'd-flex ' style={{ width:'29%', color:'white' ,background:'black'}}>

        <div style={{display: 'flex',justifyContent: 'center',gap: '60px',width:'100%'}}>
          <Mybutton process={"Hold Order"} topic={"Hold Order"}/>
          <Mybutton process={"Done"} topic={"Done"}/>
        </div>

    </div>
  )
}

export default MyOrderlist