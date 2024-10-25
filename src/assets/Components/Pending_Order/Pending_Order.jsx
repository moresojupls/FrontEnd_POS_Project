import { AddBox } from '@mui/icons-material'
import { Box } from '@mui/material'
import React, { useEffect, useState,useReducer, useId } from 'react'

function Reducer(state,action){
    // if(action.type === 'click'){
    
    //     return {
    //         id : state.id+1
    //     }
    // }
    console.log('state 2: ',state)
    return {
        id : state.id+1
    }
   
} 



function Pending_Order() {
    const [state,dispath] = useReducer(Reducer,{id:41})
    const [resultJson,setresultJson] = useState({});
    const id = useId();

 

    useEffect(()=>{
        if(window.localStorage.getItem('result_order')!==null){
            let res = (window.localStorage.getItem('result_order'));
            console.log('res : ',res.id)
            setresultJson(JSON.parse(res))  
        }
       
    },[window.localStorage.getItem('result_order')!==null])
    

   
   console.log("id : ",id)

  return (
    <>
     <input
          type="password"
          aria-describedby={id}
        />
        <p id={id}>Word 5</p>
        <button onClick={()=>{dispath({type:"click"})}}>click count : {state.id}</button>
    </>
        // <button 
        //     style={{
        //         display: 'flex',
        //         alignItems: 'center',
        //         padding: '10px 20px',
        //         border: 'none',
        //         color: 'black',
        //         background:'white',
        //         outlineStyle:'auto',
        //         outlineColor:'black',
        //         cursor: 'pointer',
        //         borderRadius: '5px',
        //         width:'100%',
        //         height:'70px'
        //     }}
        // >
        //  { resultJson !== null && window.localStorage.getItem('result_order')!==null? resultJson.name:""}
    
        
        // </button>
    

  )
}

export default Pending_Order
