import BubbleTeaShop from '../../Components/CRUD/BubbleTeaShop'
import {useState,useEffect} from 'react'
import { Modal, Button, Card, Form, Input, InputNumber, Select, Space, Table, Tag, Switch, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';


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
              {active ? 'เปิดขาย' : 'ปิดขาย'}
            </Tag>
          ),
          width: 100,
        },
        {
          title: 'สร้างเมื่อ',
          dataIndex: 'create_at',
          key: 'create_at',
          type: 'null',
          width: 150,
        },
        {
          title: 'อัปเดตเมื่อ',
          dataIndex: 'update_at',
          key: 'update_at',
          type: 'null',
          width: 150,
        },]
   
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
    
      return (load == true ? <BubbleTeaShop  result ={result.result} column = {column} page = {"supply"} selectOption={selectOption}/> :<h1>Loadding.... </h1>)
    
    
}

