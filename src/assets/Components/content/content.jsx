import { React ,useContext, useEffect, useState , useMemo,useId} from 'react'
import MyCard from '../Card_Menu/Card'
import Mybutton from '../Button/button';
import MyValidator from '../../Service/validator';
// import { UseContext } from '../../pages/User/user';
import { ProductContext }   from '../../pages/Product/product';
import MyOrderlist from '../Orderlist/orderlist';
import { Link } from 'react-router-dom';
import  './context.css';


function Mycontent({results,btn}) {
  const [result,setResult] = useState([])
  const [Orderlist,setOrderlist] = useState(true);
  

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

 

  




  function ShowData(){
    return <>
     
     <br></br>
      <div style={{marginTop:"1%",width:"100%",overflow: "scroll",paddingBottom: "10px",height: "600px"}}>
      {
        // catagory button code  
       btn != undefined ? btn.map((element)=>(<Link  style={{height:"200px"}} className="Catagory"  to={window.location.pathname.replace(window.location.href.split('/')[window.location.href.split('/').length-1],element)}>{element}</Link>)) :''
      }
     
        <div style={{marginTop:"15px",height:'10%',width:'100%',display:"flex",flexWrap:"wrap",justifyContent:"left"}}>
          
        

          {
            
          // Item list code
            result ? result.map(element => (
          
              <MyCard  key={element.product_id} id={element.product_id} img = { element.product_img } name = { element.product_name } price = { Number(element.price) } img = {element.image_url} />
                
            )): "No data"


          }
        
        </div>
       
      </div>
   
     
        <MyOrderlist setStateOrderlist={Orderlist}/>
   
    
    </>
  }
  
  
  return (ShowData())
}

export default Mycontent