import React, { useState, useEffect } from 'react';
import { Modal, Button, Card, Form, Input, InputNumber, Select, Space, Table, Tag, Switch, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import '../../Components/CRUD/BubbleTeaShop.css';

const { Option } = Select;
const { TextArea } = Input;

const BubbleTeaShop = ({result,column,page}) => {
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
    const searchText = values.searchText?.trim().toLowerCase() || "";
  
    if (!searchText) {
      setFilteredData(data);
      return;
    }
  
    const filtered = data.filter(item =>
      item.product_name.toLowerCase().includes(searchText) ||
      item.description?.toLowerCase().includes(searchText) // ตรวจสอบว่ามี description ก่อน
    );
  
    setFilteredData(filtered);
  };

  // ฟังก์ชันรีเซ็ตการค้นหา
  const resetSearch = () => {
    searchForm.resetFields();
    setFilteredData(data);
  };
 
  const createItemApi = (newItem) =>{
    console.log('create item :',page);
    switch(page){
      case "product":
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
        break;
      case "employee":
        fetch("http://127.0.0.1:4000/Employees/create",{
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
        break;
      default:
        break;
    }
  
  }
  const updateItemApi = (newItem) => {
    console.log('page :',page);
    switch(page){
      case "product":
        productItemApi(newItem);
        break;
      case "employee":
        employeeItemApi(newItem);
        break;
      default:
        break;
    }

    
  }
  const productItemApi = (newItem)=>{
     return fetch("http://127.0.0.1:4000/Products/update",{
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
      
    })
   
  }

  const employeeItemApi = (newItem)=>{
    console.log('item :',newItem);
    
    return fetch("http://127.0.0.1:4000/employees/update",{
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    })
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

  // ในคอมโพเนนต์ของคุณ
  const handleDelete = (productId) => {
    // หาข้อมูลสินค้าจาก productId เพื่อเอาชื่อมาแสดง
    const productToDelete = data.find(item => item.product_id === productId);
    
    Modal.confirm({
      title: 'ยืนยันการลบ',
      content: (
        <div>
          <p>คุณกำลังจะลบสินค้า: {productToDelete?.product_name || 'รหัส ' + productId}</p>
          <p>การกระทำนี้ไม่สามารถยกเลิกได้</p>
        </div>
      ),
      okText: 'ลบ',
      okType: 'danger',
      cancelText: 'ไม่ลบ',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      onOk() {
        // ฟังก์ชันลบจริงๆ
        const newData = data.filter(item => item.product_id !== productId);
        setData(newData);
        setFilteredData(newData);
        message.success('ลบสินค้าสำเร็จแล้ว');
      }
    });
  };

  const createModal =(res)=>{
    if(res.type == "null") return(<></>)
    if(res.readonly  ) return ( <Form.Item
        label={res.title}
        name={res.key} 
      hidden
      >
        <Input placeholder={res.title} readOnly hidden />
      </Form.Item>)
    if(res.type == "select")return ( <Form.Item
      label="หมวดหมู่"
      name="category"
      rules={[{  message: 'กรุณาเลือกหมวดหมู่' }]}
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

  const onFinish =  (values) => {
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log('value :',values)
    if (currentItem) {
 
      const updatedData = data.map(item => 
        item[column[0].key] == currentItem[column[0].key] 
          ? { 
              // employee_id: currentItem.employee_id,
              ...values,
              created_at: currentItem.create_at,
              updated_at: now 
            } 
          : item
         
      )
    
      console.log('values :',updatedData)
      updateItemApi(values);
      console.log('dasdasd',updatedData);
      setData(updatedData);
      setFilteredData(updatedData);
      message.success('อัปเดตสินค้าสำเร็จแล้ว');


      // const updatedData = data.map(item => 
      //   item.product_id == currentItem.product_id 
      //     ? { 
      //         product_id: currentItem.product_id,
      //         ...values, 
      //         create_dated: currentItem.create_at,
      //         update_dated: now 
      //       } 
      //     : item
         
      // );
    
  
      // fetch("http://127.0.0.1:4000/Products/update",{
      //   method: 'PATCH',
      //   headers:{
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(values)
      // })
      // console.log('dasdasd',values);
      // setData(updatedData);
      // setFilteredData(updatedData);
      // message.success('อัปเดตสินค้าสำเร็จแล้ว');
    } else {
      const newItem = {
        ...values,
        active: values.active !== undefined ? values.active : true,
        // product_id: `${data.length + 1}`,
        created_at: now,
        updated_at: now,
      };
      console.log('new item :',newItem);
      const newData = [...data, newItem];
      console.log('new Data ',newData);
      createItemApi(newItem);
      setData(newData);
      setFilteredData(newData);
      // // create new data by api
      
     
    }
    setIsModalVisible(false);
  };

  return (
    <div className="bubble-tea-container">
      <div className="header">
        <h1>ระบบจัดการเมนูชานมไข่มุก</h1>
        <div className="actions">
        <Form form={searchForm} onFinish={handleSearch} layout="inline">
          <Form.Item name="searchText">
          <Input 
            placeholder="ค้นหาสินค้า..." 
            prefix={<SearchOutlined />} 
            style={{ width: 200 }} 
            onPressEnter={() => searchForm.submit()} // กด Enter เพื่อค้นหา
          />
          </Form.Item>
            <Button type="default" htmlType="submit" icon={<SearchOutlined />}>
              ค้นหา
            </Button>
            <Button type="default" onClick={resetSearch}>
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