// library
import React from 'react'
import { BrowserRouter , Router,Routes,Route, } from 'react-router-dom';
import App from './App';
import ProductBtn from './assets/pages/Product/productbtn';

// page
import HomePage from './assets/pages/Home/home';
import Userpage from '../src/assets/pages/User/user';
import ProductPage from './assets/pages/Product/product';
import NotFound from './assets/pages/NotFound/notfound';


function MyRouter() {
  
   
    
    
    return (
    <BrowserRouter>
        <Routes>
            
            <Route path="/FrontEnd_POS_Project" element={<App />}>
                <Route index element={<HomePage />} />
                <Route path="User" element={<Userpage />} />

                { // All  Product pages
                    ProductBtn.map((element)=>(
                        <Route path={'Product/'+element}  element={<ProductPage/>} />
                    ))
                }
      
      
            </Route>
        </Routes>
    </BrowserRouter>
    
    // <Router basename='/'>
 
      
      
    //     <Routes>
    //         <Route index path='/FrontEnd_POS_Project' exact={true} Component={HomePage} ></Route>
    //         <Route path='/FrontEnd_POS_Project/User/member' Component={Userpage}></Route>
         
    //         <Route path='/FrontEnd_POS_Project/Product' Component={ProductPage}></Route>
    //         { // All  Product pages
    //             ProductBtn.map((element)=>(
    //                 <Route path={'/FrontEnd_POS_Project/Product/'+element} Component={ProductPage}></Route>
    //             ))
    //         }
    //         {/* <Route path='*' Component={NotFound}></Route> */}
    //     </Routes>

    // </Router>
  
  )
}

export default MyRouter