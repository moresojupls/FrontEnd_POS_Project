import { React ,useContext, useEffect, useState} from 'react'
import MyCard from '../Card_Menu/Card'
import Mybutton from '../Button/button';
import MyValidator from '../../Service/validator';
import { UseContext } from '../../pages/User/user';
import { ProductContext }   from '../../pages/Product/product';
import { Link } from 'react-router-dom';
import  './context.css';


function Mycontent() {
  
  const pathurl = window.location.href.split('/')[3];
  const pathafterCatagory = window.location.href.split('/')[4];
  let catagory = false;
  let path;
  console.log('pathurl : ',pathurl)
  switch(pathurl.toLowerCase()){
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

  
  let { col,result,btn} = useContext(path);
  if(path !== undefined && pathafterCatagory !== undefined){
    
    Object.keys(result).forEach(element => {
      if(element === pathafterCatagory.toLowerCase()){
        catagory = result[element];
        console.log('catagory: ',catagory)
      }
     
    });
   
    // pathafterCatagory[result];
    // catagory = result[pathafterCatagory.toLowerCase()];
    // console.log('catagory :',catagory)
    
  }

  
  useEffect(()=>{

    ShowData()
  },[result])


  function ShowData(){
    return <>
       {
       
       btn != undefined ? btn.map((element)=>(<Link  className="Catagory"  to={window.location.pathname.replace(window.location.href.split('/')[window.location.href.split('/').length-1],element)}>{element}</Link>)) :''
    }
    <div   style={{display:'flex', flexDirection:'row', flexWrap:'wrap' }}>
      
      

      {
        
        catagory == false  ? '':
        catagory.map(element => (
      
          <MyCard id={element.id} img = { element.img } name = { element.name } price = { element.price }/>
            
        ))
      }
    </div>
    </>
  }
  
  
  return (ShowData())
}

export default Mycontent