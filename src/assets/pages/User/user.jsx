import { useState,useEffect } from 'react';
import BubbleTeaShop from '../../Components/CRUD/BubbleTeaShop'
import { Tag } from 'antd';
import { 
  Box, 
  Button, 
  TextField, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Snackbar,
  Alert
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import DynamicCRUD from '../../Components/DynamicCRUD/DynamicCRUD';

function Userpage() {
  // สถานะสำหรับฟอร์มเพิ่มพนักงาน
  const [openAddForm, setOpenAddForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    id: 0,
    name: '',
    position: '',
    department: '',
    email: '',
    phone: ''
  });

  const [result, setResult] = useState();
  const [load, setLoad] = useState(false);
      useEffect(()=>{
          fetch("http://127.0.0.1:4000/employees/employees").then(response=>{
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

  // สถานะสำหรับ Snackbar
  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });

  // ข้อมูลพนักงานแบบจำลอง
  const [employees, setEmployees] = useState([]);

  // ฟิลด์สำหรับตาราง
  const employeeFields = [
    { name: 'id', label: 'ID', type: 'number' },
    { name: 'name', label: 'ชื่อพนักงาน' },
    { name: 'position', label: 'ตำแหน่ง' },
    { name: 'email', label: 'อีเมล' },
    { name: 'phone', label: 'โทรศัพท์' }
  ];

  // เปิดฟอร์มเพิ่มพนักงาน
  const handleAddEmployee = () => {
    setOpenAddForm(true);
    const maxId = employees.reduce((max, emp) => Math.max(max, emp.id), 0);
    setNewEmployee(prev => ({ ...prev, id: maxId + 1 }));
  };

  // ปิดฟอร์ม
  const handleCloseAddForm = () => {
    setOpenAddForm(false);
  };

  // จัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // จัดการการส่งฟอร์ม
  const handleSubmit = () => {
    if (!newEmployee.name || !newEmployee.position || !newEmployee.email) {
      setSnackbar({
        open: true,
        message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        severity: 'error'
      });
      return;
    }

    // สร้างอาร์เรย์ใหม่แทนการ mutate state โดยตรง
    const updatedEmployees = [...employees, {
      ...newEmployee,
      id: Math.max(...employees.map(e => e.id), 0) + 1
    }];

    setEmployees(updatedEmployees);
    
    setNewEmployee({
      id: 0,
      name: '',
      position: '',
      department: '',
      email: '',
      phone: ''
    });
    
    setOpenAddForm(false);
    
    setSnackbar({
      open: true,
      message: 'เพิ่มพนักงานใหม่สำเร็จ',
      severity: 'success'
    });
  };

  // ปิด Snackbar
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const column = [{
    title: 'รหัสผู้ใช้',
    dataIndex: 'employee_id',
    key: 'employee_id',

    width: 80,
    readonly: true,
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
    width: 180,
  },
  {
    title: 'phone',
    dataIndex: 'phone',
    key: 'phone',
    type:'input',
    width: 140,
  },
  {
    title: 'position',
    dataIndex: 'position',
    key: 'position',
    type:'input',
    width: 100,
  },
  {
    title: 'salary',
    dataIndex: 'salary',
    key: 'salary',
    type:'input',
    width: 100,
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

  useEffect(()=>{
    fetch('http://127.0.0.1:4000/employees/employees').then(res=>{
      return res.json()
    }).then((result)=>{
      setResult(result)
      setLoad(true)
      console.log('result :',result)
    })

      
    
  },[])

 

 
  
  return (load == true ? <BubbleTeaShop  result ={result.result} column = {column}  page={"employee"} get={()=>new Promise((resolve)=>{
    fetch('http://127.0.0.1:4000/employees/employees').then(res=>{
      return res.json()
    }).then((result)=>{
      if(!result.statusCode == 200){
        throw Error("Connection failed");
      }
      setResult(result)
      setLoad(true)
      resolve(result)
     
      
    })
    
  })}/> :<h1>Loadding.... </h1>)
    
  
}

export default Userpage;