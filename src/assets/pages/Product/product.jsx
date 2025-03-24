import { createContext, useState, useEffect } from 'react'
import App from '../../../App'

import ProductBtn from './productbtn';
import Mycontent from '../../Components/content/content';
import MyOrderlist from '../../Components/Orderlist/orderlist';
export const ProductContext = createContext('product');

function ProductPage() {
  const pathafterCatagory = window.location.pathname.split('/')[3];
  const [path, setPath] = useState();
  const [result, setResult] = useState();
  const [load, setLoad] = useState(false);



  if (pathafterCatagory.toLowerCase() !== path) setPath(pathafterCatagory)
  useEffect(() => {
    fetch("http://127.0.0.1:4000/Products/Products").then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json()
    }).then(result =>{
      setResult(result.result)
      setLoad(true)
  })
  

  }, [])
  useEffect(() => {
    setPath(pathafterCatagory.toLowerCase())
    switch (pathafterCatagory.toLowerCase()) {
      case "favourite":
        fetch("http://127.0.0.1:4000/Products/Products").then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json()
        }).then(result =>{
          setResult(result.result)
          setLoad(true)
        })
        break;
      case "milktea":
        fetch("http://127.0.0.1:4000/Products/category/milktea").then(response => {
          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json()
        }).then(result =>{
          setResult(result.result)
          setLoad(true)
        })
        break;
      case "fruittea":
        fetch("http://127.0.0.1:4000/Products/category/fruittea").then(response => {
          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json()
        }).then(result =>{
          setResult(result.result)
          setLoad(true)
        })
        break;

      default:
        setResult([])
        break;
    }

  }, [path])

  { console.log("result :", result) }
  if (load) {
    return (
      <>
        <div style={{"display":"flex"}}>
          <Mycontent results={result !== undefined ? result : ''} btn={ProductBtn} />
          {/* <MyOrderlist setStateOrderlist={Orderlist}/> */}
        </div>
        
      </>

    )
  }
}

export default ProductPage