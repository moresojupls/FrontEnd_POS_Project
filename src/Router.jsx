// library
import { useId } from 'react'
import { BrowserRouter , Router,Routes,Route  } from 'react-router-dom';
import App from './App';
import ProductBtn from './assets/pages/Product/productbtn';
import SupplyBtn from './assets/pages/Supply/supplybtn';

// page
import HomePage from './assets/pages/Home/home';
import Userpage from '../src/assets/pages/User/user';
import ProductPage from './assets/pages/Product/product';
import Productstock from './assets/pages/Product/productstock'; 
import SupplyPage from './assets/pages/Supply/supply'; 
import NotFound from './assets/pages/NotFound/notfound';
import User from './assets/MockUpData/Product/User';




function MyRouter() {

    const onLinkClick = (e) => {
        e.preventDefault();
       console.log('e : ',e)
        // history.push('/your-route');
    };

    
    
    return (
    <BrowserRouter>
        <Routes>
            
            <Route path="/FrontEnd_POS_Project" element={<App />}>
                <Route index element={<HomePage />}  />
                <Route   path="User"  element={<Userpage />}/>
                <Route   path="Product/Stock"  element={<Productstock />}/>
    
                {/* <Route  path={'Supply/crud'}  element={<ProductPage/>} />
                <Route  path={'Supply/order'}  element={<ProductPage/>} /> */}

                { // All  Product pages
                    ProductBtn.map((element,index)=>(
                        <Route  path={'Product/'+element}  element={<ProductPage/>} />
                    ))
                }
              
                { // All  Product pages
                
                    SupplyBtn.map((element,index)=>(
                        <Route  path={'Supply/'+element}  element={<SupplyPage/>} />
                    ))
                }
                
      
      
            </Route>
        </Routes>
    </BrowserRouter>
    

    
  )
}

export default MyRouter