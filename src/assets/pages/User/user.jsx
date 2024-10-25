import  { useState ,useEffect,createContext,useContext} from 'react'
import App from '../../../App'
import results_apis from '../../MockUpData/User';

export const UseContext =createContext('user');

function Userpage() {
  // const results_api = new Api('https://jsonplaceholder.typicode.com/users');
  
 
  // set up for page
 


  function PageinationData(item){
    setResult(item)
  }
  
  
    

  const [result,setResult] = useState();

  useEffect(()=>{
    
    window.localStorage.removeItem('result_order')
    setResult({"member":results_apis});
      
      
    
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
      {/* <UseContext.Provider value={{col:[],result:result !== undefined ? result:[]}}>
        <App></App>
      </UseContext.Provider>
     */}
      {/* <button onClick={() => Addvalue()}>+</button> */}
    </>
    // <App content={[]}></App>
   
  )
}

export default Userpage
// jsonplaceholder.typicode.com