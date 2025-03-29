import { useState } from 'react';
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

  return (
    <Box sx={{ p: 3 }}>
      {/* DynamicCRUD โดยส่งปุ่ม "เพิ่มพนักงานใหม่" เข้าไปแทนที่ปุ่ม Add New */}
      <DynamicCRUD 
        fields={employeeFields}
        title="Employees Management"
        customData={employees} // ส่งข้อมูลปัจจุบันเข้าไป
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddEmployee}
          sx={{ textTransform: 'none' }}
        >
          เพิ่มพนักงานใหม่
        </Button>
      </DynamicCRUD>

      {/* ฟอร์มเพิ่มพนักงาน */}
      <Dialog open={openAddForm} onClose={handleCloseAddForm} maxWidth="sm" fullWidth>
        <DialogTitle>เพิ่มพนักงานใหม่</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              fullWidth
              label="ชื่อพนักงาน"
              name="name"
              value={newEmployee.name}
              onChange={handleInputChange}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              label="ตำแหน่ง"
              name="position"
              value={newEmployee.position}
              onChange={handleInputChange}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              label="อีเมล"
              name="email"
              type="email"
              value={newEmployee.email}
              onChange={handleInputChange}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              label="โทรศัพท์"
              name="phone"
              value={newEmployee.phone}
              onChange={handleInputChange}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddForm} color="secondary">
            ยกเลิก
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            บันทึก
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar สำหรับแสดงข้อความแจ้งเตือน */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Userpage;