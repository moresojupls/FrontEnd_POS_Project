import React from 'react'
import { useState,useEffect } from "react";
import BubbleTeaShop from '../../Components/CRUD/BubbleTeaShop'
import { Modal, Button, Card, Form, Input, InputNumber, Select, Space, Table, Tag, Switch, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, SortDescendingOutlined } from '@ant-design/icons';

import axios from 'axios';

function OrderHistorySupplierPage() {
    const [result,setResult]=useState();
    const [load, setLoad] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [pagination, setPagination] = useState({
      current: 0,
      pageSize: 5,
      total: 0,
    });
     const [detail,setDetail] = useState(null)
    useEffect(() => {
      fetch(pagination.current)
    },[])
    const fetch =(number)=>{
      return new Promise((resolve,reject)=>{
        axios.get('http://127.0.0.1:4000/supplierorderhistory/supplierorderhistory/'+number).then((res)=>{
        
          setResult(res.data)
          setLoad(true)
          setPagination({
            current:res.data.currentpage,
            pageSize:res.data.sizepaginationPage,
            total:res.data.total
          })
          resolve(res.data)
        })
      })
        
    }
    const showCreateModal = (record) => {
      console.log('record22',record.items)
      setCurrentItem(null);
      form.resetFields();
      setDetail(record.items)
      setIsModalVisible(true);
  };

  const cancelModal = ()=>{
    setCurrentItem(null);
    form.resetFields();
    setIsModalVisible(false);
}

  const onChange = ()=>{
    fetch(pagination.current)
  }
    const columns  = [
        {
            title:"คําสั่งซื้อ",
            dataIndex:"id",
            key:"id",
            width:100
        },
        {
            title:"พนักงาน",
            dataIndex:"employee_name",
            key:"employee_name",
            width:100
        },
        {
            title:"ชื่อผู้ซื้อ",
            dataIndex:"vendor_name",
            key:"vendor_name",
            width:200
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
            title:"วันสั่ง",
            dataIndex:"order_date",
            key:"order_date",
            width:200,
            render: (text)=>{
                const date = new Date(text);
                return date.toLocaleString('th-TH',{
                    day:'2-digit',
                    month:'2-digit',
                    year:'numeric',
                    hour:'2-digit',
                    minute:'2-digit'
                })
            }
        }
    ]

    const column = [
      {
        title:'product_name',
        dataIndex:"product_name",
        key:"product_name",
        width:100,
      },
      {
        title:'quantity',
        key:"quantity",
        dataIndex:"quantity",
        width:100,
      },
      {
        title:'ขวด',
        dataIndex:"unit",
        key:"unit",
        width:100,
      },{
        title:'unit_price',
        dataIndex:"unit_price",
        key:"unit_price",
        width:100,
      }

    ]
  return (
    load == true ? 
    <><Modal
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
                      columns={column} 
                      dataSource={detail != null ? detail : []} 
                      rowKey="ID"
                      onChange={onChange}
                      bordered
                      pagination={{pageSize:5}}
                    />
                    </div>
                </div>
               
            </Modal>
    <BubbleTeaShop result={result.result} Pagination={pagination} column = {columns} selectOption = {[]} get={(res)=>fetch(res)} page = {"orderhistory"} /></>:<h1>Loadding....</h1>
  )
}

export default OrderHistorySupplierPage