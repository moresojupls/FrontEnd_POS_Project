import {createContext,useState,useEffect} from 'react'
import Mycontent from '../../Components/content/content';
import Powder from '../../MockUpData/Supply/Powder';
import General from '../../MockUpData/Supply/General';
import Topping from '../../MockUpData/Supply/Topping';

import  Btn from './supplybtn';
import MyOrderlist from '../../Components/Orderlist/orderlist';

// export const ProductContext = createContext('product');

function SupplyPage() {
  const pathafterCatagory = window.location.pathname.split('/')[3];
  const [path, setPath] = useState();
  const [result, setResult] = useState();
  const [load, setLoad] = useState(false);

  if (pathafterCatagory.toLowerCase() !== path) setPath(pathafterCatagory)

    useEffect(() => {
      fetch("http://127.0.0.1:4000/materials/materials/").then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json()
      }).then(result =>{
        setResult(result.result)
        setLoad(true)
    })}, []
 )

  useEffect(() => {
  setPath(pathafterCatagory.toLowerCase())
  switch (pathafterCatagory.toLowerCase()) {
    case "powder":
      fetch("http://127.0.0.1:4000/materials/category/Tea").then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json()
      }).then(result =>{
        setResult(result.result)
        setLoad(true)
      })
      break;
    case "general":
      fetch("http://127.0.0.1:4000/materials/category/General").then(response => {
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json()
      }).then(result =>{
        setResult(result.result)
        setLoad(true)
      })
      break;
    case "topping":
      fetch("http://127.0.0.1:4000/materials/category/Sauce").then(response => {
        
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
          <Mycontent results={result !== undefined ? result : ''} btn={Btn} />
          {/* <MyOrderlist setStateOrderlist={Orderlist}/> */}
        </div>
        
      </>

    )
  } 
}

export default SupplyPage
