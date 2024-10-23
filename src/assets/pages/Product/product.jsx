import React,{createContext,useState,useEffect} from 'react'
import App from '../../../App'
import Favourite from '../../MockUpData/Favourite';
import GreenTea from '../../MockUpData/Greentea';
import  ProductBtn   from './productbtn';
export const ProductContext =createContext('product');

function ProductPage() {
   
  const [result,setResult] = useState({"favourite":Favourite,"greentea":GreenTea});

  
  return (
    <ProductContext.Provider value={{col:[],result:result !== undefined ? result:[],btn:ProductBtn}}>
        <App></App>
    </ProductContext.Provider>
  )
}

export default ProductPage