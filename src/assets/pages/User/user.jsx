import  { useState ,useEffect,createContext,useContext} from 'react'
import BubbleTeaShop from '../../Components/CRUD/CRUD'
import App from '../../../App'
import results_apis from '../../MockUpData/Product/User';
import { Modal, Button, Card, Form, Input, InputNumber, Select, Space, Table, Tag, Switch, message } from 'antd';

import myImage from '../../image';



export const UseContext =createContext('user');

function Userpage() {
  // const results_api = new Api('https://jsonplaceholder.typicode.com/users');
  
 
  // set up for page
 
  const column = [{
    title: 'รหัสผู้ใช้',
    dataIndex: 'product_id',
    key: 'product_id',
    type: 'input',
    width: 100,
  },
  {
    title: 'ชื่อ',
    dataIndex: 'product_name',
    key: 'product_name',
    type: 'text',
    render: (text) => <strong>{text}</strong>,
  },
  {
    title: 'นามสกุล',
    dataIndex: 'description',
    key: 'description',
    type: 'input',
    ellipsis: true,
  },
  {
    title: 'email',
    dataIndex: 'price',
    key: 'price',
    type: 'textArea',
    render: (price) => `${price} บาท`,
    width: 100,
  },
  {
    title: 'phone',
    dataIndex: 'category',
    key: 'category',
    width: 120,
  },
  {
    title: 'สถานะ',
    dataIndex: 'active',
    type:'active',
    key: 'active',
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
    type:'null',
    width: 150,
  },
  {
    title: 'อัปเดตเมื่อ',
    dataIndex: 'updated_at',
    key: 'updated_at',
    type:'null',
    width: 150,
  },]

  function PageinationData(item){
    setResult(item)
  }
  
  
    

  const [result,setResult] = useState();
  const [load, setLoad] =useState(false);

  useEffect(()=>{
    fetch('http://127.0.0.1:4000/employees/employees').then(res=>{
      return res.json()
    }).then((result)=>{
      setResult(result)
      setLoad(true)
    })

      
    
  },[])

 

 
  
  return (load == true ? <BubbleTeaShop  result ={result.result} column = {column} /> :<h1>Loadding.... </h1>)
    
  
}

export default Userpage
// jsonplaceholder.typicode.com