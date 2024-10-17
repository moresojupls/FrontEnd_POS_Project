import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InventoryIcon from '@mui/icons-material/Inventory';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Start } from '@mui/icons-material';


function MySidebar() {
  return (
    
    <div style={{ width: '200px', backgroundColor: '#f5f5f5', height: '85vh', paddingTop: '10px', position: 'fixed', left: 5, top: '100px' }}>      
           <List>
             <ListItem button>
               <ListItemIcon>
                 <HomeIcon />
               </ListItemIcon>
               <ListItemText primary="Home" />
             </ListItem>
             <ListItem button>
               <ListItemIcon>
                 <AssessmentIcon />
               </ListItemIcon>
               <ListItemText primary="Report" />
             </ListItem>
             <ListItem button>
               <ListItemIcon>
                 <InventoryIcon />
               </ListItemIcon>
               <ListItemText primary="Supply" />
             </ListItem>
             <ListItem button>
               <ListItemIcon>
                 <ExitToAppIcon />
               </ListItemIcon>
               <ListItemText primary="Logout" />
             </ListItem>
           </List>
    </div>
    
  )
}


export default MySidebar

