import BubbleTeaShop from '../../Components/CRUD/BubbleTeaShop'
import {useState,useEffect} from 'react'
import { Modal, Button, Card, Form, Input, InputNumber, Select, Space, Table, Tag, Switch, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';


export default function Productstock(){
    const [result, setResult] = useState();
    const [load, setLoad] = useState(false);
    const [pagination, setPagination] = useState({
          current: 0,
          pageSize: 5,
          total: 0,
        });
    const column = [{
          title: 'รหัสสินค้า',
          dataIndex: 'product_id',
          key: 'product_id',
          width: 100,
          readonly: true,
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
          type:'input',
          width: 70,
        },
        {
          title: 'รูป',
          dataIndex: 'image',
          key: 'image',
          type:'image',
          width: 70,
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
   
    const selectOption = ["Milk Tea","Fruit Tea","General"]
    useEffect(()=>{
      fetchData(pagination.current)
    },[])

    const fetchData= (number)=>{
      return new Promise((resolve,reject)=>{
        
     axios.get('http://127.0.0.1:4000/Products/Products/'+number).then((res)=>{
        
          setResult(res.data)
          setLoad(true)
          setPagination({
            current:res.data.currentpage,
            pageSize:res.data.sizepaginationPage,
            total:res.data.total
          })
          resolve(res.data)
        })  
    })}
      
    
    
   
    
     return (load == true ? <BubbleTeaShop  result ={result.result} Pagination={pagination} column = {column} page = {"product"} selectOption={selectOption} get={(res)=>fetchData(res)}  deleteApi = {
      (id)=>new Promise((resolve)=>{
        fetch(`http://127.0.0.1:4000/Products/delete/${id}`,{method:'DELETE'}).then(response=>{
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
          
        })
    })
    }/> :<h1>Loadding.... </h1>)
    
    
}