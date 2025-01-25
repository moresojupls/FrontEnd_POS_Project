import {createContext,useState,useEffect} from 'react'
import App from '../../../App'
import Favourite from '../../MockUpData/Favourite';
import GreenTea from '../../MockUpData/Greentea';
import  ProductBtn   from './productbtn';
import Mycontent from '../../Components/content/content';
import btn from './productbtn';
import MyOrderlist from '../../Components/Orderlist/orderlist';
import axios from 'axios';
import { json } from 'react-router-dom';
export const ProductContext = createContext('product');

function ProductPage() {
  const pathafterCatagory = window.location.pathname.split('/')[3];
  const [path,setPath] = useState();
  const [result,setResult] = useState(Favourite);
  const urlapi =  "http/localhost:8503/api/Users/View";
  if(pathafterCatagory.toLowerCase() !== path) setPath(pathafterCatagory)
  useEffect(()=>{
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8503/api/Users/View",{
          headers:{
            "Content-Type":"application/json"
          },
          mode:"cors"
        });

        // if(response.contenttype === null) return;
        const api = JSON.parse(response.data.result);
        // const results = JSON.parse(response.data.result).Result;

        setPath(pathafterCatagory.toLowerCase())
        switch(pathafterCatagory.toLowerCase()){
          case "favourite":
            // setResult(results);
            break;
          case "greentea":
            setResult(GreenTea);
            break;
          default:
            setResult([])
            break;
        }
  
        console.log(response); // ตรวจสอบ Response ที่ได้รับ
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts()
    
  },[path])

  
  
  return (
    <>
      <Mycontent results={result !== undefined?result:''} btn={ProductBtn}/>
    </>
  
  )
}

export default ProductPage