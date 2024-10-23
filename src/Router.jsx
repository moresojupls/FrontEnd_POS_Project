// library
import React from 'react'
import { BrowserRouter as Router,Routes,Route,Link,useNavigate, replace } from 'react-router-dom';
import App from './App';

// page
import HomePage from './assets/pages/Home/home';
import Userpage from '../src/assets/pages/User/user';
import ProductPage from './assets/pages/Product/product';
import NotFound from './assets/pages/NotFound/notfound';


function MyRouter() {
  
   
    
    
    return (
    <Router basename=''>
 
      
      
        <Routes>
            <Route path='/' exact={true} Component={HomePage} ></Route>
            <Route path='/User' Component={Userpage}></Route>
            <Route path='/Product' Component={ProductPage}></Route>
            <Route path='/Product/favourite' Component={ProductPage}></Route>
            <Route path='/Product/greentea' Component={ProductPage}></Route>
            <Route path='*' Component={ProductPage}></Route>
        </Routes>

    </Router>
  
  )
}

export default MyRouter