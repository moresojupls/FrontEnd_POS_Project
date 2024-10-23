import  { useState ,useEffect,createContext,useContext} from 'react'
import App from '../../../App'

import Api   from '../../Service/api'
import MyValidator from '../../Service/validator';


export const UseContext =createContext('user');

function Userpage() {
  const results_api = new Api('https://jsonplaceholder.typicode.com/users');
0
 
  // set up for page
 


  function PageinationData(item){
    setResult(item)
  }
  
  const btn =[
    {topic:"Favourite",process:() => PageinationData("Favourite")},
    {topic:"GreenTea",process:() => PageinationData("GreenTea")},
    
  ]
    
  

  const [result,setResult] = useState();

  useEffect(()=>{
    results_api.getApi().then((res)=>{
      
      setResult(res);
      
    })
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
      <UseContext.Provider value={{col:[],result:result !== undefined ? result:[]}}>
        <App btn={btn}></App>
      </UseContext.Provider>
    
      {/* <button onClick={() => Addvalue()}>+</button> */}
    </>
    // <App content={[]}></App>
   
  )
}

export default Userpage