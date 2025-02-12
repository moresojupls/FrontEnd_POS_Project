import {useEffect,useState} from 'react'
import { List, ListItem, ListItemIcon,  } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InventoryIcon from '@mui/icons-material/Inventory';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { BrowserRouter as Router,Routes,Route,Link,useNavigate } from 'react-router-dom';
import "./sidebar.css"
import Loader from '../TestComponent/hamster';


import img from '../../image';
import Myimg from '../Image/img';
import { ImportExport } from '@mui/icons-material';


//  paddingTop: '10px', position: 'fixed', left: 5, top: '100px' 
function MySidebar() {

  var [respone,setrespone]= useState(false);

  useEffect(() => {
    function handleResize() {
      // Update the state or perform any other actions when the
      // browser is resized
      setrespone(window.innerWidth<1000)
    }
    // Attach the event listener to the window object
    window.addEventListener('resize', handleResize);
    

 

  }, []);

 
 
  return (
    <div  className="sidebar" style={{  minWidth:'100px', width:'9%',justifyItems:"center"}}>      
           <List>
            <div className='Onclickhover'>
             <Link  onClick={()=>{
              
            }} to={'/'+window.location.pathname.replace(window.location.pathname,window.location.pathname.split('/')[1])}>
              <ListItem button width='100rem'>
                <div  style={{width:"100%"}}>
                  <Myimg  url={img.House} size={40}></Myimg>
                  <h4  className="sidebarbtn" style={{display:respone? 'none':'' ,fontSize:'1vw'}}>Home</h4>
                </div>
              </ListItem>
            </Link>
             </div>
             

           
             {/* <ListItem button>
               <ListItemIcon>
                 <AssessmentIcon />
               </ListItemIcon>
               <h4 className="sidebarbtn" style={{display:respone? 'none':'' ,fontSize:'1vw'}}>Report</h4>
             </ListItem>
             <ListItem button>
               <ListItemIcon>
                 <InventoryIcon />
               </ListItemIcon>
               <h4 className="sidebarbtn" style={{display:respone? 'none':'' ,fontSize:'1vw'}}>Supply</h4>
             </ListItem> */}
            <div className='Menu'>
              <div className='Menu Onclickhover'>
              <Link to={'/'+window.location.pathname.replace(window.location.pathname,window.location.pathname.split('/')[1])+"/product/favourite"} >
                  <ListItem button width='100rem' >
                    <div>
                      <Myimg  url={img.LogoBrand} size={40}></Myimg>
                      <h4 className="sidebarbtn" style={{display:respone? 'none':'' ,fontSize:'1vw'}}>Product</h4>
                    </div>
                  
                  </ListItem>
                </Link>
                </div>
              <div className='submenu'>
              <div className='Onclickhover '>
              <Link to={'/'+window.location.pathname.replace(window.location.pathname,window.location.pathname.split('/')[1])+"/product/favourite"} >
                  <ListItem button width='100rem' >
                    <div>
                      <Myimg  url={img.LogoBrand} size={40}></Myimg>
                      <h4 className="sidebarbtn" style={{display:respone? 'none':'' ,fontSize:'1vw'}}>submenu</h4>
                    </div>
                  
                  </ListItem>
                </Link>
              </div>
              <div className='Onclickhover'>
              <Link to={'/'+window.location.pathname.replace(window.location.pathname,window.location.pathname.split('/')[1])+"/product/favourite"} >
                  <ListItem button width='100rem' >
                    <div>
                      <Myimg  url={img.LogoBrand} size={40}></Myimg>
                      <h4 className="sidebarbtn" style={{display:respone? 'none':'' ,fontSize:'1vw'}}>submenu</h4>
                    </div>
                  
                  </ListItem>
                </Link>
              </div>
              </div>
              
            </div>


            <div className='Menu'>
            <div className='MenuOnclickhover'>
             <Link to={'/'+window.location.pathname.replace(window.location.pathname,window.location.pathname.split('/')[1])+"/user"} style={{width:"100%"}}>
              <ListItem button>
                <div>
                  <Myimg  url={img.User} size={40}></Myimg>
                  <h4 className="sidebarbtn" style={{display:respone? 'none':'' ,fontSize:'1vw'}}>Admin</h4>
                </div>
               
              </ListItem>
             </Link>
             </div>
              <div className='submenu'>
              <div className='Onclickhover '>
              <Link to={'/'+window.location.pathname.replace(window.location.pathname,window.location.pathname.split('/')[1])+"/product/favourite"} >
                  <ListItem button width='100rem' >
                    <div>
                      <Myimg  url={img.LogoBrand} size={40}></Myimg>
                      <h4 className="sidebarbtn" style={{display:respone? 'none':'' ,fontSize:'1vw'}}>submenu</h4>
                    </div>
                  
                  </ListItem>
                </Link>
              </div>
              <div className='Onclickhover'>
              <Link to={'/'+window.location.pathname.replace(window.location.pathname,window.location.pathname.split('/')[1])+"/product/favourite"} >
                  <ListItem button width='100rem' >
                    <div>
                      <Myimg  url={img.LogoBrand} size={40}></Myimg>
                      <h4 className="sidebarbtn" style={{display:respone? 'none':'' ,fontSize:'1vw'}}>submenu</h4>
                    </div>
                  
                  </ListItem>
                </Link>
              </div>
              </div>
              
            </div>
            
              
            
            {/* Wrapper ของ Loader ที่ตั้งค่า marginTop: auto; */}
            {/* <div style={{ marginTop: 'auto' }}>
              <Loader />
            </div> */}
            
            
             {/* <ListItem button>
               <ListItemIcon>
                 <ExitToAppIcon />
               </ListItemIcon>
               <h4 className="sidebarbtn" style={{display:respone? 'none':'' ,fontSize:'1vw'}}>Log out</h4>
             </ListItem> */}
           </List>
    </div>
    
  )
}


export default MySidebar

