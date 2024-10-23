import React,{createContext,useState,useEffect} from 'react'
import App from '../../../App'
import Favourite from '../../MockUpData/Favourite';
import GreenTea from '../../MockUpData/Greentea';
export const ProductContext =createContext('product');

function ProductPage() {
   
    const [result,setResult] = useState({"Favourite":Favourite,"GreenTea":GreenTea});
      
  
  return (
    <ProductContext.Provider value={{col:[],result:result !== undefined ? result:[]}}>
        <App></App>
    </ProductContext.Provider>
  )
}

export default ProductPage