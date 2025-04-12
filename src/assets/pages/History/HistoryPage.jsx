import { Functions } from "@mui/icons-material";
import { DynamicCRUD } from "../../Components/DynamicCRUD/DynamicCRUD";
import Mycontent from '../../Components/content/content';
import { useState,useEffect } from "react";
import BubbleTeaShop from '../../Components/CRUD/BubbleTeaShop'
export default function HistoryPage() {
    const [result,setResult]=useState();
    const [load, setLoad] = useState(false);
    const column = [];
    useEffect(()=>{
            fetch("http://127.0.0.1:4000/Products/Products/Table").then(response=>{
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
    return (
        load == true ? <BubbleTeaShop  result ={result.result} column = {column} page = {"product"}/> :<h1>Loadding.... </h1>
    )

}
