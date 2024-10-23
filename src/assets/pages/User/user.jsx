import  { useState ,useEffect,createContext,useContext} from 'react'
import App from '../../../App'

import Api   from '../../Service/api'
// import MyValidator from '../../Service/validator';
import img from '../../image';


export const UseContext =createContext('user');

function Userpage() {
  const results_api = new Api('https://jsonplaceholder.typicode.com/users');

 
  // set up for page
 


  function PageinationData(item){
    setResult(item)
  }
  
  
    

  const [result,setResult] = useState();

  useEffect(()=>{
    results_api.getApi().then((res)=>{
      res.map((element)=>{
        element.img = img.thaitea
      })
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
        <App></App>
      </UseContext.Provider>
    
      {/* <button onClick={() => Addvalue()}>+</button> */}
    </>
    // <App content={[]}></App>
   
  )
}

export default Userpage
// jsonplaceholder.typicode.com