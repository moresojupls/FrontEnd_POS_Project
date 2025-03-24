import {createContext,useState,useEffect} from 'react'
import Mycontent from '../../Components/content/content';
import Powder from '../../MockUpData/Supply/Powder';
import General from '../../MockUpData/Supply/General';
import Topping from '../../MockUpData/Supply/Topping';

import    Btn from './supplybtn';


import MyOrderlist from '../../Components/Orderlist/orderlist';
// export const ProductContext = createContext('product');

function SupplyPage() {
  const pathafterCatagory = window.location.pathname.split('/')[window.location.pathname.split('/').length-1];
  const [path,setPath] = useState();
  console.log('pathafterCatagory' ,pathafterCatagory);
  const [result,setResult] = useState();
  if(pathafterCatagory.toLowerCase() !== path) setPath(pathafterCatagory)
  useEffect(()=>{
    setPath(pathafterCatagory.toLowerCase())
    console.log('pathafterCatagory.toLowerCase()',pathafterCatagory.toLowerCase());
    // switch(pathafterCatagory.toLowerCase()){
    //   case "powder":
    //     setResult(Powder);
    //     break;
    //   case "general":
    //     setResult(General);
    //     break;
    // case "topping":
    //     setResult(Topping);
    //     break;
    //   default:
    //     setResult([]);
    //     break;
    // }
  
  },[path])

  
  
  return (
    <>
      <Mycontent results={result !== undefined?result:''} btn={Btn}/>
    </>
  
  )
}

export default SupplyPage