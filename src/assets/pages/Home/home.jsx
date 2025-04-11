
import { useEffect, useState } from 'react';
import SimpleSlider from '../../Components/Carousel/Carousel';
import { useNavigate } from 'react-router-dom';



function HomePage() {
    const [user,setUser] = useState(); 
    const navigate = useNavigate();
    useEffect(()=>{
        
            // fetch('http://127.0.0.1:4000/employees/employees').then((res)=>{
            //     return res.json()
            // }).then((result)=>{
            //     // setUser(result.result[0])
            //     localStorage.setItem("user",JSON.stringify({"id":result.result[0].employee_id,
            //         "name":result.result[0].employee_name,
            //         "gender":"man"
            //     }));
            //     setUser(localStorage.getItem("users"))
            // }).finally(()=>{
            //     console.log(user)
            //     // localStorage.setItem("user", JSON.stringify(user));
            // })
            // console.log("user :",user)
        
        
    },[])
 

    
    return (
        <div style={{maxWidth:'800px'}}>
            <button onClick={a}>Click</button>
        {console.log('user :',JSON.parse(localStorage.getItem("user")))}
            <SimpleSlider/>
 
   
        
       

        </div>

    )
}

export default HomePage