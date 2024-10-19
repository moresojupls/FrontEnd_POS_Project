import React from 'react'
import MyCard from '../Card_Menu/Card'

function Mycontent({items}) {
    console.log('items : ',items)
  return (
    
    
    items.map(element => (
        
        
       
        <div key={element.id} className="card-wrapper" style={{paddingRight: '20px'}}>
            <MyCard  myimg = { element.myimg }name = { element.name } price = { element.price }/>
        </div>
        
    ))


    
    
   
   

  )
}

export default Mycontent