import BubbleTeaShop from '../../Components/CRUD/CRUD'
import {useState,useEffect} from 'react'
import { Modal, Button, Card, Form, Input, InputNumber, Select, Space, Table, Tag, Switch, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';


export default function Productstock(){
    const [result, setResult] = useState();
    const [load, setLoad] = useState(false);
    const column = [{
          title: 'รหัสสินค้า',
          dataIndex: 'product_id',
          key: 'product_id',
          type: 'input',
          width: 100,
        },
        {
          title: 'ชื่อสินค้า',
          dataIndex: 'product_name',
          key: 'product_name',
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
          title: 'ราคา',
          dataIndex: 'price',
          key: 'price',
          render: (price) => `${price} บาท`,
          width: 100,
        },
        {
          title: 'หมวดหมู่',
          dataIndex: 'category',
          type:'select',
          key: 'category',
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
          dataIndex: 'created_at',
          key: 'created_at',
          type: 'null',
          width: 150,
        },
        {
          title: 'อัปเดตเมื่อ',
          dataIndex: 'updated_at',
          key: 'updated_at',
          type: 'null',
          width: 150,
        },]
   
    
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
    
     return (load == true ? <BubbleTeaShop  result ={result.result} column = {column} /> :<h1>Loadding.... </h1>)
    
    
}