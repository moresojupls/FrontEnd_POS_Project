import {createContext,useState,useEffect} from 'react'
import App from '../../../App'
import Favourite from '../../MockUpData/Favourite';
import GreenTea from '../../MockUpData/Greentea';
import  ProductBtn   from './productbtn';
import Mycontent from '../../Components/content/content';
import btn from './productbtn';
import MyOrderlist from '../../Components/Orderlist/orderlist';
export const ProductContext = createContext('product');

function ProductPage() {
  const pathafterCatagory = window.location.pathname.split('/')[3];
  const [path,setPath] = useState();
  const [result,setResult] = useState(Favourite);
  if(pathafterCatagory.toLowerCase() !== path) setPath(pathafterCatagory)
  useEffect(()=>{
    setPath(pathafterCatagory.toLowerCase())
    switch(pathafterCatagory.toLowerCase()){
      case "favourite":
        setResult(Favourite);
        break;
      case "greentea":
        setResult(GreenTea);
        break;
      default:
        setResult([])
        break;
    }
  
  },[path])

  
  
  return (
    <>
      <Mycontent results={result !== undefined?result:''} btn={ProductBtn}/>
    </>
  
  )
}

export default ProductPage