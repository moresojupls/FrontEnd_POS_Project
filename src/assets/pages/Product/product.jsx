import React,{createContext,useState,useEffect} from 'react'
import App from '../../../App'
import Favourite from '../../MockUpData/Favourite';
import GreenTea from '../../MockUpData/Greentea';
export const ProductContext =createContext('product');

function ProductPage() {
   
  const [result,setResult] = useState({"favourite":Favourite,"greentea":GreenTea});
      
  
  return (
    <ProductContext.Provider value={{col:[],result:result !== undefined ? result:[],btn:Object.keys(result)}}>
        <App></App>
    </ProductContext.Provider>
  )
}

export default ProductPage