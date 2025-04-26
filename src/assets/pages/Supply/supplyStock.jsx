import BubbleTeaShop from '../../Components/CRUD/BubbleTeaShop';
import { useState, useEffect } from 'react';
import { Tag } from 'antd';

export default function SupplyStock(){
    const [result, setResult] = useState();
    const [load, setLoad] = useState(false);
    const column = [{
          title: 'รหัสสินค้า',
          dataIndex: 'mat_id',
          key: 'mat_id',
          width: 100,
          readonly: true,
        },
        {
          title: 'ชื่อสินค้า',
          dataIndex: 'mat_name',
          key: 'mat_name',
          type: 'input',
          render: (text) => <strong>{text}</strong>,
        },
        {
          title: 'คำอธิบาย',
          dataIndex: 'description',
          key: 'description',
          type:'textArea',
          ellipsis: true,
        },
        {
          title: 'หมวดหมู่',
          dataIndex: 'category',
          key: 'category',
          type:'select',
          width: 70,
        },
        {
          title: 'ราคา',
          dataIndex: 'price',
          type:'input',
          key: 'price',
          width: 120,
        },
        {
          title: 'สถานะ',
          dataIndex: 'active',
          key: 'active',
          type:'active',
          render: (active) => (
            <Tag color={active ? 'green' : 'red'}>
              {active ? 'ใช้งาน' : 'ไม่ใช้งาน'}
            </Tag>
          ),
          width: 100,
        },
        {
          title: 'สร้างเมื่อ',
          dataIndex: 'created_at',
          key: 'created_at',
          width: 150,
          readonly: true,
          render: (text) => {
            const date = new Date(text);
            return date.toLocaleString('th-TH', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            });
          },
        },
        {
          title: 'อัปเดตเมื่อ',
          dataIndex: 'updated_at',
          key: 'updated_at',
          width: 150,
          readonly: true,
          render: (text) => {
            const date = new Date(text);
            return date.toLocaleString('th-TH', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            });
          },
        }
      ]
   
    const selectOption = ["General","Powder","Topping"]
    useEffect(()=>{
        fetch("http://127.0.0.1:4000/materials/materials/").then(response=>{
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
    
    
      return (load == true ? <BubbleTeaShop  result ={result.result} column = {column} page = {"supply"} selectOption={selectOption} deleteApi = {
        (id)=>{return(
          new Promise((resolve)=>{
          fetch(`http://127.0.0.1:4000/materials/delete/${id}`,{method:'DELETE'}).then(response=>{
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
              resolve(result);
            
          })}))}
      } get={()=>new Promise((resolve)=>{
        fetch("http://127.0.0.1:4000/materials/materials/").then(response=>{
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
            resolve(result);
          
        })})} /> :<h1>Loadding.... </h1>)
    
    
}
