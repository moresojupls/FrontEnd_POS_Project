import { Functions } from "@mui/icons-material";
import { DynamicCRUD } from "../../Components/DynamicCRUD/DynamicCRUD";
import Mycontent from '../../Components/content/content';
import { Modal, Button, Card, Form, Input, InputNumber, Select, Space, Table, Tag, Switch, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { useState,useEffect } from "react";
import BubbleTeaShop from '../../Components/CRUD/BubbleTeaShop'
export default function HistoryPage() {
    const [result,setResult]=useState();
    const [load, setLoad] = useState(false);
     const [currentItem, setCurrentItem] = useState(null);
     const [isModalVisible, setIsModalVisible] = useState(false);
     const [form] = Form.useForm();
     const [detail,setDetail] = useState(null)

    const showCreateModal = (record) => {
        setCurrentItem(null);
        form.resetFields();
        setDetail(record)
        setIsModalVisible(true);
    };
    const cancelModal = ()=>{
        setCurrentItem(null);
        form.resetFields();
        setIsModalVisible(false);
    }
    const column = [{
        title: 'รหัสตําสั่งซื้อ',
        dataIndex: 'transaction_id',
        key: 'transaction_id',
        width: 120,
        readonly: true,
      },
      {
        title: 'รายละเอียด',
        dataIndex: 'detail',
        key: 'detail',
        type: 'detail',
        render:(_,record)=>(
            <Space size="middle">
            <Button 
              type="primary" 
              shape="circle" 
              icon={<SearchOutlined />} 
              onClick={() => {
                console.log('record',record)
                showCreateModal(record);
                
              }}
            />
           
          </Space>
        )
      
      },
      
      {
        title: 'คนขาย',
        dataIndex: 'employee_name',
        key: 'employee_name',
        type:'input',
        ellipsis: true,
      },
      {
        title: 'ราคาทั้งหมด',
        dataIndex: 'total_price',
        key: 'total_price',
        type:'input',
        width: 100,
      },
      {
        title: 'quantity',
        dataIndex: 'quantity',
        type:'input',
        key: 'quantity',
        width: 120,
      },
      // {
      //   title: 'สถานะ',
      //   dataIndex: 'active',
      //   key: 'active',
      //   type:'active',
      //   render: (active) => (
      //     <Tag color={active ? 'green' : 'red'}>
      //       {active ? 'เปิดขาย' : 'ปิดขาย'}
      //     </Tag>
      //   ),
      //   width: 100,
      // },
      {
        title: 'ทํารายการ',
        dataIndex: 'transaction_date',
        key: 'transaction_date',
        type: 'null',
        width: 150,
      }]

      const columns = [
     
        {
          title: 'ชื่อสินค้า',
          dataIndex: 'menu',
          key: 'menu',
          render: text => <strong>{text}</strong>,
        },
        {
          title: 'size',
          dataIndex: 'size',
          key: 'size',
          align: 'right',
        },
        {
          title: 'price',
          dataIndex: 'price',
          key: 'price',
        //   render: (text, record) => (
        //     <span style={{ color: record.stock.includes('หมด') ? 'red' : 'green' }}>
        //       {text}
        //     </span>
        //   ),
        },
        {
          title: 'quantity',
          dataIndex: 'quantity',
          key: 'quantity',
        },
        {
          title: 'total',
          dataIndex: 'total',
          key: 'total',
        //   render: status => (
        //     <Tag color={status === 'มีสินค้ามาก' ? 'green' : 'orange'}>
        //       {status}
        //     </Tag>
        //   ),
        },
        {
            title: 'toppings',
            dataIndex: 'toppings',
            key: 'toppings',
            render: status => (
              
                status.map(element => (
                  <>
                    <h5>{element.name}</h5>
                  </>
                    
                    
                ))
                
            ),
          },
      ];
    useEffect(()=>{
            fetch("http://127.0.0.1:4000/Transactions/Transactions/Test").then(response=>{
                if(!response.ok){
                    throw Error("Connection failed"); 
                }
                return response.json()
            }).then((result)=>{
                if(!result.statusCode == 200){
                    throw Error("Connection failed");
                }
                console.log('result ',result)
                setResult(result);
                setLoad(true);
            })
        },[])
    return (
        load == true ? <>

       <Modal
                title={currentItem ? "" : "ดูรายการ"}
                visible={isModalVisible}
                onCancel={()=>{
                    cancelModal()
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
                
                width={1000}
                centered
              >
                <div>
                    {/* <h3>{detail != null ? detail.transaction_id:''}</h3> */}
                    {/* {detail != null ? detail.product_detail.map(element => {
                       
                        return (<div className="flex justify-between items-center border-b py-2 text-sm text-gray-80">
                             <h3 className="w-1/2 font-medium">{element.menu}</h3>
                                <h3 className="w-1/4 text-center">{element.size}</h3>
                                <h3 className="w-1/4 text-right">{element.price} บาท</h3>
                        </div>)
                    } */}
                    <div style={{ padding: '20px' }}>
                    <h2>รายการสินค้า</h2>
                    <Table 
                      columns={columns} 
                      dataSource={detail != null ? detail.product_detail : []} 
                      rowKey="ID"
                      bordered
                      pagination={{ pageSize: 5 }}
                    />
                    </div>
                </div>
               
            </Modal>
            <BubbleTeaShop  result ={result.result} column = {column} page = {"transaction"}/>
        </> :<h1>Loadding.... </h1>
    )

}
