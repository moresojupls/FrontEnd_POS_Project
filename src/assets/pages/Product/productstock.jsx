import BubbleTeaShop from '../../Components/CRUD/CRUD'
import {useState,useEffect} from 'react'

export default function Productstock(){
    const [result, setResult] = useState();
    const [load, setLoad] = useState(false);
    useEffect(()=>{
        fetch("http://127.0.0.1:4000/Products/Products").then(response=>{
            if(!response.ok){
                throw Error("Connection failed"); 
            }
            return response.json()
        }).then((result)=>{
            if(!result.statusCode == 200){
                throw Error("Connection failed");
            }
            setResult(result);
            setLoad(true);
        })
    },[])
    console.log('result : ',result)
    return (load == true ? <BubbleTeaShop result ={result.result}/> :<h1>Loadding.... </h1>)
    
    
}