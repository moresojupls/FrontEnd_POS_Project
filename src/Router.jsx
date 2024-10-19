// library
import React from 'react'
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
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
            <Route path='/Home' Component={HomePage}></Route>
            <Route path='/User' Component={Userpage}></Route>
            <Route path='/Product' Component={ProductPage}></Route>
            <Route path='*' Component={NotFound}></Route>
        </Routes>

    </Router>
  
  )
}

export default MyRouter