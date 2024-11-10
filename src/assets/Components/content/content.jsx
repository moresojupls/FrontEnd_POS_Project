import { React ,useContext, useEffect, useState , useMemo,useId} from 'react'
import MyCard from '../Card_Menu/Card'
import Mybutton from '../Button/button';
import MyValidator from '../../Service/validator';
import { UseContext } from '../../pages/User/user';
import { ProductContext }   from '../../pages/Product/product';
import { Link } from 'react-router-dom';
import  './context.css';


function Mycontent({results,btn}) {
  const [result,setResult] = useState([])
  const idelement = useId();

  function plus(results,btn){
    results = 5;
    btn = 6;
  }
  const user = useMemo(()=>
    plus(results,btn)
    
  ,[results,btn])
  
  useEffect(()=>{
    
    setResult(results)
    
  },[results !== result])

  // console.log('pathafterCatagory : ',pathafterCatagory)


  
  // let { col,result,btn} = useContext(path);
  // if(path !== undefined && pathafterCatagory !== undefined){
    
  //   Object.keys(result).forEach(element => {
  //     if(element === pathafterCatagory.toLowerCase()){
  //       catagory = result[element];
  //       console.log('catagory: ',catagory)
  //     }
     
  //   });
   
  //   // pathafterCatagory[result];
  //   // catagory = result[pathafterCatagory.toLowerCase()];
  //   // console.log('catagory :',catagory)
    
  // }

  




  function ShowData(){
    return <>
   
      {
        // catagory button code  
       btn != undefined ? btn.map((element)=>(<Link  style={{height:"200px"}} className="Catagory"  to={window.location.pathname.replace(window.location.href.split('/')[window.location.href.split('/').length-1],element)}>{element}</Link>)) :''
      }
     
          <div style={{marginTop:"15px",overflow:"scroll",height:'100%'}}>
          
        

          {
            
          // Item list code
            result.map(element => (
          
              <MyCard key={element.id} img = { element.img } name = { element.name } price = { element.price } />
                
            ))
          }
        </div>
   
    
    </>
  }
  
  
  return (ShowData())
}

export default Mycontent