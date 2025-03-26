import React, { useState, useEffect } from 'react';
import { Modal, Button, Card, Form, Input, InputNumber, Select, Space, Table, Tag, Switch, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import '../../Components/CRUD/BubbleTeaShop.css';

const { Option } = Select;
const { TextArea } = Input;

const BubbleTeaShop = () => {
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

  // ฟังก์ชันค้นหา
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

  const columns = [
    {
      title: 'รหัสสินค้า',
      dataIndex: 'product_id',
      key: 'product_id',
      width: 100,
    },
    {
      title: 'ชื่อสินค้า',
      dataIndex: 'product_name',
      key: 'product_name',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'คำอธิบาย',
      dataIndex: 'description',
      key: 'description',
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
      key: 'category',
      width: 120,
    },
    {
      title: 'สถานะ',
      dataIndex: 'active',
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
      dataIndex: 'create_at',
      key: 'create_at',
      width: 150,
    },
    {
      title: 'อัปเดตเมื่อ',
      dataIndex: 'update_at',
      key: 'update_at',
      width: 150,
    },
    {
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
      width: 120,
    },
  ];

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

  const onFinish = (values) => {
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    if (currentItem) {
      const updatedData = data.map(item => 
        item.product_id === currentItem.product_id 
          ? { 
              ...values, 
              product_id: currentItem.product_id,
              create_at: currentItem.create_at,
              update_at: now 
            } 
          : item
      );
      setData(updatedData);
      setFilteredData(updatedData);
      message.success('อัปเดตสินค้าสำเร็จแล้ว');
    } else {
      const newItem = {
        ...values,
        active: values.active !== undefined ? values.active : true,
        product_id: `${data.length + 1}`,
        create_at: now,
        update_at: now,
      };
      const newData = [...data, newItem];
      setData(newData);
      setFilteredData(newData);
      message.success('เพิ่มสินค้าใหม่สำเร็จแล้ว');
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
          scroll={{ x: 1300 }}
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
          <Form.Item
            label="ชื่อสินค้า"
            name="product_name"
            rules={[{ required: true, message: 'กรุณากรอกชื่อสินค้า' }]}
          >
            <Input placeholder="เช่น ชานมไข่มุกคลาสสิก" />
          </Form.Item>

          <Form.Item
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
              <Option value="ชานม">ชานม</Option>
              <Option value="ชาเขียว">ชาเขียว</Option>
              <Option value="ชาผลไม้">ชาผลไม้</Option>
              <Option value="กาแฟ">กาแฟ</Option>
              <Option value="อื่นๆ">อื่นๆ</Option>
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
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BubbleTeaShop;