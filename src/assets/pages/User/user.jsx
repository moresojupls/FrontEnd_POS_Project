import React, { useState ,useEffect} from 'react'
import App from '../../../App'

import Api   from '../../Service/api'



function Userpage() {
  const results_api = new Api('https://jsonplaceholder.typicode.com/users');

  // eslint-disable-next-line react-hooks/rules-of-hooks
  let [result,setCount] = useState();
      

  useEffect(()=>{
    if(result !== undefined) console.log('result : ',result);
   

  },[result])
  function Addvalue(){
    
    return  results_api.getApi().then((value)=>{
      setCount(value)
     })
   
  }
  
  return (
    <>
      <App content={[result]}></App>
      <button onClick={() => Addvalue()}>+</button>
    </>
    // <App content={[]}></App>
   
  )
}

export default Userpage