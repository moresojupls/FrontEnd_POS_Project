import { React ,useContext, useEffect, useState} from 'react'
import MyCard from '../Card_Menu/Card'
import Mybutton from '../Button/button';
import MyValidator from '../../Service/validator';
import { UseContext } from '../../pages/User/user';
import { ProductContext }   from '../../pages/Product/product';


function Mycontent() {
  
  const pathurl = window.location.href.split('/')[3];
  const pathafterCatagory = window.location.href.split('/')[4];
  let catagory ="";
  let path;
  switch(pathurl){
    case 'product':
      path = ProductContext;
      break;
    case 'user':
      path = UseContext;
      break;
    default:
      path = ProductContext;
      break;

  }

  
  let { col,result } =useContext(path);
  if(pathafterCatagory === 'Favourite' && path !== undefined){
    catagory = "Favourite"
  }else if(pathafterCatagory === 'Greentea' && path !== undefined){
    catagory = "GreenTea" 
  }else{

  }
  console.log('pathafterCatagory',pathafterCatagory)
  
  useEffect(()=>{
    console.log('result : ',result)
    ShowData()
  },[result])


  function ShowData(){
    return <div   style={{display:'flex', flexDirection:'row', flexWrap:'wrap' }}>
      
      {
        
      
        result[catagory].map(element => (
      
            <MyCard id={element.id} img = { element.img } name = { element.name } price = { element.price }/>
            
        ))
      }
    </div>
  }
  
  
  return (ShowData())
}

export default Mycontent