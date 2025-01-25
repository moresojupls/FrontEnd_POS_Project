import  { useState ,useEffect,createContext,useContext} from 'react'
import App from '../../../App'
import results_apis from '../../MockUpData/User';
import axios from 'axios';
import Mycontent from '../../Components/content/content';

import { Password } from '@mui/icons-material';
export const MyContext =createContext();

function Userpage() {
  // const results_api = new Api('https://jsonplaceholder.typicode.com/users');
  
 
  // set up for page
 


  function PageinationData(item){
    setResult(item)
  }
  
  
    
  const colCard = ["Email","Username","Password"];
  const [result,setResult] = useState();


  useEffect(()=>{
    
    window.localStorage.removeItem('result_order')
    
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8503/api/Users/View",{
          headers:{
            "Content-Type":"application/json"
          },
          mode:"cors"
        });

        // if(response.contenttype === null) return;
        const api = await JSON.parse(response.data.result);
        // const results = JSON.parse(response.data.result).Result;
        setResult(api);
      
        console.log(result); // ตรวจสอบ Response ที่ได้รับ
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts()

      
      
    
  },[])

  if(result !== undefined) console.log('result : ',result);

 
  
  // useEffect(()=>{
  //   if(!Validator.ValueUndefined(result)) console.log('result : ',result);
   

  // },[result])
  // function Addvalue(){
    
  //   return  results_api.getApi().then((value)=>{
  //     setCount(value)
  //    })
   
  // }
  
  return (
    <>
      <h1>1User</h1>
      <MyContext.Provider value={{result}}>
        <Mycontent results={result !== undefined?result:null} colCard={colCard} table={"User"}/>
      </MyContext.Provider>
     

      {/* <button onClick={() => Addvalue()}>+</button> */}
    </>
    // <App content={[]}></App>
   
  )
}

export default Userpage
// jsonplaceholder.typicode.com