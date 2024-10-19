import React from 'react'
import '../../../MyCard.css'

function MyCard({myimg,name,price}) {
  return (
    <div className="card-wrapper" >
      <div className="card" >
        <img src={myimg} alt="Name" style={{display: 'flex'  ,width: "150px" , borderRadius:"8px" }} />
          <h6> {name} </h6>
          <h3><b> {price} </b> </h3>
      </div>
    </div>
  )
}

export default MyCard
