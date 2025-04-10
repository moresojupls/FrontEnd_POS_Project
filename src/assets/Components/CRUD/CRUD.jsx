import React, { useState, useEffect } from 'react';
import { Modal, Button, Card, Form, Input, InputNumber, Select, Space, Table, Tag, Switch, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import '../../Components/CRUD/BubbleTeaShop.css';

const { Option } = Select;
const { TextArea } = Input;

const BubbleTeaShop = ({result,column}) => {
  const [columnTable,setColumn] = useState([]);
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // ตั้งค่า filteredData เท่ากับ data เมื่อโหลดครั้งแรก
  useEffect(() => {
    setFilteredData(data);
   
  }, [data]);
  useEffect(()=>{
    setData(result);
    setFilteredData(result);
    if(column !== undefined) setColumn(column);
    console.log('console.log(columnTable)',columnTable)
    
  },[])
  
  // ฟังก์ชันค้นหา match two column between own page column and crud column
  
  const columns =  [...columnTable,...[{
    title: 'การดำเนินการ',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button 
          type="primary" 
          shape="circle" 
          icon={<EditOutlined />} 
          onClick={() => showEditModal(record)}
        />
        <Button 
          type="primary" 
          danger 
          shape="circle" 
          icon={<DeleteOutlined />} 
          onClick={() => handleDelete(record.product_id)}
        />
      </Space>
    ),
  },]]
  
   
  
    
  
  const handleSearch = (values) => {
    if (!values.searchText) {
      setFilteredData(data);
      return;
    }
    
    const filtered = data.filter(item =>
      item.product_name.toLowerCase().includes(values.searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(values.searchText.toLowerCase()) ||
      item.category.toLowerCase().includes(values.searchText.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // ฟังก์ชันรีเซ็ตการค้นหา
  const resetSearch = () => {
    searchForm.resetFields();
    setFilteredData(data);
  };
  const updateItemApi = (newItem) =>{

  }
  const createItemApi = (newItem) => {
    fetch("http://127.0.0.1:4000/Products/create",{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
      
    }).then((res)=>{
      if (!res.ok) {
        throw new Error('การเชื่อมต่อ API ล้มเหลว');
      }
      return res.json();
    }).then((data)=>{
      
      message.success('เพิ่มสินค้าใหม่สำเร็จแล้ว');
    }).catch((error) => {
      message.error(`เกิดข้อผิดพลาด: ${error.message}`);
    });
  }
 
  const selectOption = ["Milk Tea","Fruit Tea","General"]
  

  const showCreateModal = () => {
    setCurrentItem(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (record) => {
    setCurrentItem(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (product_id) => {
    const newData = data.filter(item => item.product_id !== product_id);
    setData(newData);
    setFilteredData(newData);
    message.success('ลบสินค้าสำเร็จแล้ว');
  };

  const createModal =(res)=>{
    if(res.type == "null") return(<></>)
    if(res.type == "select")return ( <Form.Item
      label="หมวดหมู่"
      name="category"
      rules={[{ required: true, message: 'กรุณาเลือกหมวดหมู่' }]}
    >
      <Select defaultValue={selectOption[0]}>
        {
        selectOption.map(result=>
          <Option key={result} value={result}>{result}</Option>
        )}
       
        
      </Select>
    </Form.Item>)
    if(res.type == "input") return ( <Form.Item
      label={res.title}
      name={res.key}
      rules={[{ required: true, message: `กรุณากรอก${res.title}` }]}
    >
      <Input placeholder={res.title} />
    </Form.Item>)
    if(res.type == "textArea") return (
      <Form.Item
      label={res.title}
      name={res.key}
    >
      <TextArea rows={3} placeholder={res.title} />
    </Form.Item>
    )
    if(res.type == "active") return (<Form.Item
      label={res.title}
      name={res.key}
      valuePropName="checked"
    >
      <Switch 
        checkedChildren="เปิดขาย" 
        unCheckedChildren="ปิดขาย"
      />
    </Form.Item>)
    // return (
    //   <Form.Item
    //   label={res.title}
    //   name={res.key}
    //   rules={[{ required: true, message: `กรุณากรอก${res.title}` }]}
    // >
    //   <Input placeholder={res.title} />
    // </Form.Item>)

  }

  const onFinish = (values) => {
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    if (currentItem) {
      
      const updatedData = data.map(item => 
        item.employee_id == currentItem.employee_id 
          ? { 
              employee_id: currentItem.employee_id,
              ...values,
              create_dated: currentItem.create_at,
              update_dated: now 
            } 
          : item
         
      );
    
      console.log('values :',values)
      fetch("http://127.0.0.1:4000/employees/update",{
        method: 'PATCH',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      console.log('dasdasd',updatedData);
      setData(updatedData);
      setFilteredData(updatedData);
      message.success('อัปเดตสินค้าสำเร็จแล้ว');
    } else {
      const newItem = {
        ...values,
        active: values.active !== undefined ? values.active : true,
        // product_id: `${data.length + 1}`,
        create_ated: now,
        update_ated: now,
      };
      console.log('new item :',newItem);
      const newData = [...data, newItem];
      console.log('new Data ',newData);
      setData(newData);
      setFilteredData(newData);
      // // create new data by api
      // createItemApi(newItem);
     
    }
    setIsModalVisible(false);
  };

  return (
    <div className="bubble-tea-container">
      <div className="header">
        <h1>ระบบจัดการเมนูชานมไข่มุก</h1>
        <div className="actions">
          <Form form={searchForm} onFinish={handleSearch} layout="inline" style={{ marginRight: 16 }}>
            <Form.Item name="searchText" style={{ marginRight: 8 }}>
              <Input 
                placeholder="ค้นหาสินค้า..." 
                prefix={<SearchOutlined />} 
                style={{ width: 200 }}
              />
            </Form.Item>
            <Button 
              type="default" 
              htmlType="submit"
              icon={<SearchOutlined />}
              style={{ marginRight: 8 }}
            >
              ค้นหา
            </Button>
            <Button 
              type="default" 
              onClick={resetSearch}
            >
              ล้างการค้นหา
            </Button>
          </Form>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={showCreateModal}
          >
            เพิ่มสินค้าใหม่
          </Button>
        </div>
      </div>
      <Card className="menu-card">
        <Table 
          columns={columns} 
          dataSource={filteredData}
          pagination={{ pageSize: 5 }} 
          bordered
          scroll={{ x: 300 }}
        />
      </Card>
      
      
      <Modal
        title={currentItem ? "แก้ไขสินค้า" : "เพิ่มสินค้าใหม่"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            ยกเลิก
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            onClick={() => form.submit()}
          >
            {currentItem ? "อัปเดต" : "บันทึก"}
          </Button>,
        ]}
        width={700}
        centered
      >
        <Form
          form={form}
          name="productForm"
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            active: true
          }}
        >
          {column.map(res=>(<>
          {
            createModal(res)
          }
         
          </>
          ))}
          
         
          {/* <Form.Item
            label="ชื่อสินค้า"
            name="product_name"
            rules={[{ required: true, message: 'กรุณากรอกชื่อสินค้า' }]}
          >
            <Input placeholder="เช่น ชานมไข่มุกคลาสสิก" />
          </Form.Item> */}

          {/* <Form.Item
            label="คำอธิบาย"
            name="description"
          >
            <TextArea rows={3} placeholder="รายละเอียดสินค้า" />
          </Form.Item>

          <Form.Item
            label="ราคา"
            name="price"
            rules={[{ required: true, message: 'กรุณากรอกราคา' }]}
          >
            <InputNumber 
              min={1} 
              max={200} 
              formatter={value => `${value} บาท`}
              parser={value => value.replace(' บาท', '')}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            label="หมวดหมู่"
            name="category"
            rules={[{ required: true, message: 'กรุณาเลือกหมวดหมู่' }]}
          >
            <Select>
              {
              selectOption.map(result=>
                <Option key={result} value={result}>{result}</Option>
              )}
             
              
            </Select>
          </Form.Item>

          <Form.Item
            label="สถานะ"
            name="active"
            valuePropName="checked"
          >
            <Switch 
              checkedChildren="เปิดขาย" 
              unCheckedChildren="ปิดขาย"
            />
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
};

export default BubbleTeaShop;