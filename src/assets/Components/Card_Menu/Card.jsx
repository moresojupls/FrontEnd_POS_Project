import React from 'react'
import '../../../MyCard.css'



function MyCard({img,name,id,price}) {

  return (
    <div className="card-wrapper" style={{width:"200px"}}>
      <div className="card" >
        <img src={img} alt="Not Found Img" style={{display: 'flex'   , borderRadius:"8px" }} />
          {/* <h7> ID : {id} </h7> */}
          <h7> Name : {name} </h7>
          <h5><b> { price !== undefined ?'Price : ':'' }{price} </b> </h5>
        <button onClick={()=>{
          
        }}>Click Here</button>
      </div>
    </div>
  )
}

export default MyCard
