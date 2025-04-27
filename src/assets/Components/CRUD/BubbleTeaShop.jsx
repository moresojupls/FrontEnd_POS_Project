import React, { useState, useEffect } from 'react';
import { Modal, Button, Card, Form, Input, InputNumber, Select, Space, Table, Tag, Switch, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import '../../Components/CRUD/BubbleTeaShop.css';

const { Option } = Select;
const { TextArea } = Input;

const BubbleTeaShop = ({result,column,page,selectOption,get,deleteApi}) => {
  const [columnTable,setColumn] = useState([]);
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [detail,setDetail] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isCreate,setIsCreate] = useState(false);
  const [isLoad,setLoad] = useState(false);
  const [image,setImage] = useState();
  const [selectedValue, setSelectedValue] = useState(selectOption[0]); // ล็อคค่าเริ่มต้น

  
  // ตั้งค่า filteredData เท่ากับ data เมื่อโหลดครั้งแรก
 
  useEffect(()=>{
    setData(result);
    setFilteredData(result);
    if(column !== undefined) setColumn(column);
    if(page != "transaction") setIsCreate(true);
    
    // deny all of is import to visible
    setColumn(column.filter((column)=>{
      return column.type != "image"
    }))
   
    
    
  },[])
  useEffect(() => {
    setFilteredData(data);
   
  }, [data]);
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
          onClick={() => handleDelete(record)}
        />
      </Space>
      
    
    
    )
  }]];

  const handleImage = (e)=>{
    const image = e.target.files[0];
    if(image){
      //console.log('image',image);
      const reader = new FileReader();
      reader.onload = (event)=>{
        console.log('dasdasd',event.target.result);
        // console.log('image :',event.target.result)
        setImage(event.target.result);
      };
      reader.readAsDataURL(image);
    }
  }
  
   
  
    
  
  const handleSearch = (values) => {
    const searchText = values.searchText?.trim().toLowerCase() || "";
    console.log('value',data)
    if (!searchText) {
      setFilteredData(data);
      return;
    }
  
    const filtered = data.filter(item =>
      item.mat_name?.toLowerCase().includes(searchText) ||
      item.employee_name?.toLowerCase().includes(searchText) ||
      item.product_name?.toLowerCase().includes(searchText) ||
      item.description?.toLowerCase().includes(searchText) // ตรวจสอบว่ามี description ก่อน
    );
  
    setFilteredData(filtered);
  };

  // ฟังก์ชันรีเซ็ตการค้นหา
  const resetSearch = () => {
    searchForm.resetFields();
    setFilteredData(data);
  };
 
  const createItemApi = async(newItem) =>{
    console.log('create item :',page);
    switch(page){
      case "product":
       await fetch("http://127.0.0.1:4000/Products/create",{
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
            get();
          }).catch((error) => {
            message.error(`เกิดข้อผิดพลาด: ${error.message}`);
          });
          
        break;
      case "employee":
        await fetch("http://127.0.0.1:4000/Employees/create",{
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
      case "supply":
        await fetch("http://127.0.0.1:4000/materials/create",{
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
  const updateItemApi = async(newItem) => {
    console.log('page :',page);
    switch(page){
      case "product":
        await productItemApi(newItem)
        break;
      case "employee":
        await employeeItemApi(newItem);
        break;
      case "supply":
        await supplyItemApi(newItem);
        break;
      default:
        break;
    }

    
  }

  const productById = (newItem)=>{
   
  
       return new Promise((resolve,reject)=>{
        fetch(`http://127.0.0.1:4000/products/products/${newItem.product_id}`).then(response => {
          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json()
        }).then(result =>{
          
          setImage(result.result[0].image_url)
          resolve(result.result[0].image_url)
        
         
        })
       }) 
    
    
     

   
  }
  const productItemApi = async(newItem)=>{
    if(image == undefined){
      await productById(newItem).then((res)=>{
      newItem.image = res
      })}
    else{
      newItem.image = image
    };
    console.log('item :',newItem)
   
   
     await fetch("http://127.0.0.1:4000/Products/update",{
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
      
    })
   
   
  
  setImage(undefined)

    
   
  }
  

  const employeeItemApi = async(newItem)=>{
    console.log('item :',newItem);
    
    await fetch("http://127.0.0.1:4000/employees/update",{
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    })
  }
  const supplyById = (newItem)=>{
    return new Promise((resolve,reject)=>{
      console.log('item :',newItem);
      fetch(`http://127.0.0.1:4000/materials/materials/${newItem.mat_id}`).then(response => {
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json()
      }).then(result =>{
        
        setImage(result.result[0].img_url)
        resolve(result.result[0].img_url)
      
       
      })
     }) 
  }
  const supplyItemApi = async(newItem)=>{
    console.log('item 22:',newItem);
    if(image == undefined){
      await supplyById(newItem).then((res)=>{
        console.log('resss',res)
      newItem.image = res
      })}
    else{
      newItem.image = image
    };
  
    console.log('item :',newItem)
    
    await fetch("http://127.0.0.1:4000/materials/update",{
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    })
  }
 
  
  

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
    //item.mat_id === productId.mat_id ||
   console.log(productId)
    const productToDelete = data.find(item =>{
      if (productId.mat_id && item.mat_id === productId.mat_id) {
        return true;
      }
      if (productId.employee_id && item.employee_id === productId.employee_id) {
        return true;
      }
      if (productId.product_id && item.product_id === productId.product_id) {
        return true;
      }
      return false;
    }
    );
    
    const tableToDeleteId = productToDelete.mat_id || productToDelete.product_id || productToDelete.employee_id;
    
    Modal.confirm({
      title: 'ยืนยันการลบ',
      content: (
        <div>
          <p>คุณกำลังจะลบ: {productToDelete?.product_name || productToDelete?.mat_name || productToDelete?.employee_name || 'รหัส ' + productId}</p>
          <p>การกระทำนี้ไม่สามารถยกเลิกได้</p>
        </div>
      ),
      okText: 'ลบ',
      okType: 'danger',
      cancelText: 'ไม่ลบ',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      async onOk() {
        // ฟังก์ชันลบจริงๆ
        console.log('tableToDeleteId',tableToDeleteId)
        const deleteapi = await deleteApi(tableToDeleteId);
       deleteapi
        if(deleteapi.statusCode == 200){
          const result = await get();
          
          if(result.statusCode == 200 || result.statuscode == 200){
            // wait delete api
            setData(result.result);
            setFilteredData(result.result);
            message.success('ลบสำเร็จแล้ว');
            
           
          }
        }
       
      }
    });

   
  };

  const handleChange = (e) => {
    
    setSelectedValue(e);
  };


  const createModal =(res)=>{
    if(res.type == "null") return(<></>)
    if(res.type == "image") return(
      <Form.Item
        label={res.title}
        name={res.key} 
       
      
      >
        
       <input type='file' accept="image/*" onChange={handleImage} value={image}/>
      </Form.Item>
    )
    if(res.type == "detail") return(
      <Form.Item
        label={res.title}
        name={res.key} 
      hidden 
      >
       <button>Click</button>
      </Form.Item>
    )
    if(res.readonly == true) return ( <Form.Item
        label={res.title}
        name={res.key} 
        hidden
      >
        <Input placeholder={res.title} readOnly  hidden />
      </Form.Item>)
    if(res.type == "select")return ( <Form.Item
      label="หมวดหมู่"
      name="category"
      rules={[{  message: 'กรุณาเลือกหมวดหมู่' }]}
    >
      <Select defaultValue={selectOption[0]} value={selectedValue}  onChange={handleChange}>
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

  const onFinish =  async(values) => {
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log("selectedValue",selectedValue)
    values.category =selectedValue;
    
    if (currentItem) {
      
 
      const updatedData = data.map(item => 
        item[column[0].key] == currentItem[column[0].key] 
          ? { 
              // employee_id: currentItem.employee_id,
              ...values,
              // created_at: currentItem.created_at,
              // updated_at: now 
            } 
          : item
         
      )
    
      console.log('values :',updatedData)
   
      await updateItemApi(values);
      
      const result = await get();
      console.log('sss',result)
        if(result.statusCode == 200 || result.statuscode == 200){
          message.success('อัปเดตสินค้าสำเร็จแล้ว');
          setData(result.result);
          // setFilteredData((prev)=>[...prev,result.result]);
          
         
        }
        
       
     
     
      
    
     


    } else {
      
      const newItem = {
        ...values,
        active: values.active !== undefined ? values.active : true,
        // product_id: `${data.length + 1}`,
       
      };
      newItem.image = image;
      console.log('new item :',values);
      const newData = [...data, newItem];
      console.log('new Data ',newData);
      await createItemApi(newItem);
      setData(newData);
      setFilteredData(newData);
      setImage(undefined);
      message.success('เพิ่มสินค้าสำเร็จแล้ว');

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
          {isCreate ? (<Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={showCreateModal}
          >
            เพิ่มสินค้าใหม่
          </Button>):''}
        </div>
      </div>
      {!isLoad ? <Card className="menu-card">
        <Table 
          columns={!isCreate  ? columnTable:columns} 
          dataSource={filteredData}
          pagination={{ pageSize: 5 }} 
          bordered
          scroll={{ x: 300 }}
        />
      </Card>:<></>}
      
      
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

      {/* <Modal
                title={currentItem ? "" : "ดูรายการ"}
                visible={detail}
                onCancel={()=>{
                  handleCancel()
                }}
                footer={[
                 
                //   <Button 
                //     key="submit" 
                //     type="primary" 
                //     onClick={() => form.submit()}
                //   >
                //     {currentItem ? "อัปเดต" : "บันทึก"}
                //   </Button>,
                ]}
                
                width={700}
                centered
              >
                <h1>{ }</h1>
            </Modal> */}
    </div>
  );
};

export default BubbleTeaShop;