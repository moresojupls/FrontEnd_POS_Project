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
    dataIndex: 'employee_id',
    key: 'employee_id',
    type: 'input',
    width: 100,
  },
  {
    title: 'ชื่อ',
    dataIndex: 'employee_name',
    key: 'employee_name',
    type: 'input',
    width: 100,
    render: (text) => <strong>{text}</strong>,
  },
  {
    title: 'นามสกุล',
    dataIndex: 'employee_lastname',
    key: 'employee_lastname',
    type: 'input',
    width: 100,
    ellipsis: true,
  },
  {
    title: 'email',
    dataIndex: 'email',
    key: 'email',
    type: 'textArea',
    render: (email) => `${email} `,
    width: 200,
  },
  {
    title: 'phone',
    dataIndex: 'phone',
    key: 'phone',
    width: 160,
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
  // {
  //   title: 'สร้างเมื่อ',
  //   dataIndex: 'created_at',
  //   key: 'created_at',
  //   type:'null',
  //   width: 150,
  // },
  // {
  //   title: 'อัปเดตเมื่อ',
  //   dataIndex: 'updated_at',
  //   key: 'updated_at',
  //   type:'null',
  //   width: 150,
  // },
]

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
      console.log('result :',result)
    })

      
    
  },[])

 

 
  
  return (load == true ? <BubbleTeaShop  result ={result.result} column = {column} /> :<h1>Loadding.... </h1>)
    
  
}

export default Userpage
// jsonplaceholder.typicode.com