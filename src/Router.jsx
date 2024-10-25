// library
import React from 'react'
import { BrowserRouter as Router,Routes,Route,Link,useNavigate, replace } from 'react-router-dom';
import App from './App';
import ProductBtn from './assets/pages/Product/productbtn';

// page
import HomePage from './assets/pages/Home/home';
import Userpage from '../src/assets/pages/User/user';
import ProductPage from './assets/pages/Product/product';
import NotFound from './assets/pages/NotFound/notfound';
import LoginPage from './assets/Components/LoginPage/LoginPage';


function MyRouter() {
  
   
    
    
    return (
    <Router basename='/'>
 
      
      
        <Routes>
            <Route path='/' exact={true} Component={HomePage} ></Route>
            <Route path='/User/member' Component={Userpage}></Route>
            <Route path='/User/login' Component={LoginPage}></Route>

         
            <Route path='/Product' Component={ProductPage}></Route>
            { // All  Product pages
                ProductBtn.map((element)=>(
                    <Route path={'/Product/'+element} Component={ProductPage}></Route>
                ))
            }
            <Route path='*' Component={NotFound}></Route>
        </Routes>

    </Router>
  
  )
}

export default MyRouter