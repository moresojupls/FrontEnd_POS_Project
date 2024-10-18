import {useEffect,useState} from 'react'
import { List, ListItem, ListItemIcon,  } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InventoryIcon from '@mui/icons-material/Inventory';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


//  paddingTop: '10px', position: 'fixed', left: 5, top: '100px' 
function MySidebar() {
 
  var [respone,setrespone]= useState(true);

  useEffect(() => {
    function handleResize() {
      // Update the state or perform any other actions when the
      // browser is resized
      setrespone(window.innerWidth<600)
    }
    // Attach the event listener to the window object
    window.addEventListener('resize', handleResize);

 

  }, []);
 
  
  console.log('window.screen.width :',window.innerWidth)
  return (
    <div  style={{  minWidth:'60px', width:'10%',backgroundColor: '#f5f5f5', height: '85vh'}}>      
           <List>
             <ListItem button width='100rem'>
               <ListItemIcon>
                 <HomeIcon />
               </ListItemIcon>
               <h4 style={{display:respone? 'none':'' ,fontSize:'1vw'}}>Home</h4>
             </ListItem>
             <ListItem button>
               <ListItemIcon>
                 <AssessmentIcon />
               </ListItemIcon>
               <h4 style={{display:respone? 'none':'' ,fontSize:'1vw'}}>Report</h4>
             </ListItem>
             <ListItem button>
               <ListItemIcon>
                 <InventoryIcon />
               </ListItemIcon>
               <h4 style={{display:respone? 'none':'' ,fontSize:'1vw'}}>Supply</h4>
             </ListItem>
             <ListItem button>
               <ListItemIcon>
                 <ExitToAppIcon />
               </ListItemIcon>
               <h4 style={{display:respone? 'none':'' ,fontSize:'1vw'}}>Log out</h4>
             </ListItem>
           </List>
    </div>
    
  )
}


export default MySidebar

