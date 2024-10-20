import React from 'react'
import MyCard from '../Card_Menu/Card'

function Mycontent({items}) {
  if(items.length > 0)console.log('items',items);
    
  return (
    <>
    <div   style={{display:'flex', flexDirection:'row', flexWrap:'wrap' }}>
        {
        items.map(element => (
       
            <MyCard id={element.id} myimg = { element.myimg } name = { element.name } price = { element.price }/>
            
        ))
        }
    </div>
    </>
    

    
    
   
   

  )
}

export default Mycontent