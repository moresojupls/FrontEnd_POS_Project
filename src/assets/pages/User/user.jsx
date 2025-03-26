import  { useState ,useEffect,createContext,useContext} from 'react'
import BubbleTeaShop from '../../Components/CRUD/CRUD'
import App from '../../../App'
import results_apis from '../../MockUpData/Product/User';

import myImage from '../../image';



export const UseContext =createContext('user');

function Userpage() {
  // const results_api = new Api('https://jsonplaceholder.typicode.com/users');
  
 
  // set up for page
 


  function PageinationData(item){
    setResult(item)
  }
  
  
    

  const [result,setResult] = useState();
  const [load, setLoad] =useState(false);

  useEffect(()=>{
    fetch('http://127.0.0.1:4000/employees/employees').then(res=>{
      return res.json()
    }).then((result)=>{
      setResult(result)
      setLoad(true)
    })

      
    
  },[])

 

 
  
  // useEffect(()=>{
  //   if(!Validator.ValueUndefined(result)) console.log('result : ',result);
   

  // },[result])
  // function Addvalue(){
    
  //   return  results_api.getApi().then((value)=>{
  //     setCount(value)
  //    })
   
  // }
  
  return ( load === true ? <BubbleTeaShop result={result.result}/> :<h1>loading .....</h1>)
    
  
}

export default Userpage
// jsonplaceholder.typicode.com