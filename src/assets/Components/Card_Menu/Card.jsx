import React from 'react'
import '../../../MyCard.css'



function MyCard({myimg,name,id,price}) {
  price=10;
  return (
    <div className="card-wrapper" style={{width:"230px"}}>
      <div className="card" >
        <img src={myimg} alt="Not Found Img" style={{display: 'flex'   , borderRadius:"8px" }} />
          <h7> ID : {id} </h7>
          <h7> Name : {name} </h7>
          <h5><b> Price : {price !== undefined ?'Price':''}{price} </b> </h5>
        <button onClick={()=>{
          
        }}>Click Here</button>
      </div>
    </div>
  )
}

export default MyCard
