import { React ,useContext, useEffect, useState , useMemo,useId} from 'react'
import MyCard from '../Card_Menu/Card'
import Mybutton from '../Button/button';
import MyValidator from '../../Service/validator';
import { MyContext } from '../../pages/User/user';
import { ProductContext }   from '../../pages/Product/product';
import { Link } from 'react-router-dom';
import  './context.css';


function Mycontent({btn,colCard,table}) {
  let con;
  if(table == "User"){
    con = MyContext;
  }else if(table == "Product"){
    con = ProductContext;
  }
  const {result} = useContext(con);
  const [unnullResult,setunnullResult] = useState(false);
  // const a = ()=>{
  //   console.log("res : ",result.result)
  //   return result.result != undefined;
  // }




  
 
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

  
  // if(result.length > 0){
  //   console.log(result);
  //   setunnullResult(true);
  // }



  function ShowData(){
    return <>
   
      {
        // catagory button code  
       btn != undefined ? btn.map((element)=>(<Link  style={{height:"200px"}} className="Catagory"  to={window.location.pathname.replace(window.location.href.split('/')[window.location.href.split('/').length-1],element)}>{element}</Link>)) :''
      }
     
          <div style={{marginTop:"15px",overflow:"scroll",height:'100%'}}>
          
          {
            console.log('result ',result)
          }
        

          {
         
         result != undefined  ? result.Result.map(element => (
          
              <MyCard key={element.id}  colCard={colCard} item = {element} />
                
            )):"no items"
          }
        </div>
   
    
    </>
  }
  
  
  return (ShowData())
}

export default Mycontent