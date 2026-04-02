import React, { useState, useEffect, useRef } from "react";
import { Card, Row, Col, Typography, InputNumber, Button, Divider, message, Modal, Spin } from "antd";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./vendor.css";
import axios from "axios";

// Define components and styles
const { Title, Text } = Typography;

const VendorPage = () => {
  const [materials, setMaterials] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [isOrderModalVisible, setOrderModalVisible] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [newVendorId, setNewVendorId] = useState(null);
  const slipRef = useRef();
  const [isReceiptReady, setIsReceiptReady] = useState(false);
  const [savedOrderItems, setSavedOrderItems] = useState([]);
  const [savedTotal, setSavedTotal] = useState(0);
  const [isReceiptDownloaded, setIsReceiptDownloaded] = useState(false);

  const [employeeName, setEmployeeName] = useState("");  // เพิ่ม state เพื่อเก็บชื่อผู้สั่ง
  // authorization
        const userData = localStorage.getItem("user");
        const parseUser = JSON.parse(userData);
        const auth = parseUser.Authorization.replace("Bearer ","")
  useEffect(() => {
    fetchMaterials();
    fetchEmployeeName();  // เรียกใช้ฟังก์ชันดึงชื่อพนักงาน
  }, []);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const userData = localStorage.getItem("user");
      const parseUser = JSON.parse(userData);
      const auth = parseUser.Authorization.replace("Bearer ","")
      const config =   {
                          headers:{
              authorization:"Bearer "+auth
              }
            }
      const response = await fetch("http://127.0.0.1:4000/materials/materials/",config);
      const responseVendorMaterial = await fetch("http://127.0.0.1:4000/vendor_material/vendor_material",config);
       
      if (!response.ok && !responseVendorMaterial.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      const vendorMaterialData = await responseVendorMaterial.json();
     
     console.log('vendorMaterialData',vendorMaterialData)
     const formattedMaterials   = data.result.map((item1) => {
      const a = vendorMaterialData.result.find((res)=>{
        return res.mat_id == item1.mat_id
      })

      item1.vendor_name = a === undefined ? "SuperMarket" : a.vendor_name
      
      
      return item1
        
      })
     
      
      // console.log('index',index);
   
      // return item.mat_id == vendorMaterialData.result[index].mat_id 
      
    

    console.log('formattedMaterials :',formattedMaterials)
    //   const formattedMaterials = vendorMaterialData.result.map((item,index) => {
    //     if(data.result[index].mat_id == item.mat_id) return ({
    //     material_id: data.result[index].mat_id,
    //     material_name: data.result[index].mat_name,
    //     supply_price: parseFloat(data.result[index].price),
    //     lead_time_days: 2,
    //     img_url: data.result[index].img_url || "https://source.unsplash.com/featured/?ingredient",
    //     supplier_name: data.result[index].mat_id == item.mat_id ? item.vendor_name : "Unknown",
    //   })
    // });
     
      setMaterials(formattedMaterials);
    } catch (error) {
      console.error(error);
      message.warning("Using temporary data due to fetch failure");
      setMaterials(getSampleMaterials());
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployeeName = async () => {
    try {
      const  user =  JSON.parse(localStorage.getItem("user")) || null;
      const response = await fetch("http://127.0.0.1:4000/employees/employees/"+user.result.id);
      const data = await response.json();
      setEmployeeName(data.result[0]?.employee_name);  // เก็บชื่อผู้สั่ง
    } catch (error) {
      console.error("Failed to fetch employee name", error);
    }
  };

  // const getSampleMaterials = () => [
  //   {
  //     material_id: 1,
  //     material_name: "Wheat Flour",
  //     supply_price: 50,
  //     lead_time_days: 2,
  //     img_url: "https://source.unsplash.com/featured/?flour",
  //     supplier_name: "Bakery Shop",
  //   },
  //   {
  //     material_id: 2,
  //     material_name: "Sugar",
  //     supply_price: 30,
  //     lead_time_days: 2,
  //     img_url: "https://source.unsplash.com/featured/?sugar",
  //     supplier_name: "Bakery Shop",
  //   },
  // ];

  const [orderTotal, setOrderTotal] = useState(0);
  const handleQtyChange = (id, value) => {
    console.log('id ',quantities)
    const newQuantities = { ...quantities, [id]: value };
    setQuantities(newQuantities);

    const calculateTotal = materials.reduce((sum, item) => {
      const qty = newQuantities[item.mat_id] || 0;
      return sum + qty * parseInt(item.price);
    }, 0);

    setOrderTotal(calculateTotal);
  };

  const handleOrder = () => {
    const items = materials
      .filter((item) => quantities[item.mat_id] > 0)
      .map((item) => ({
        material_id: item.mat_id,
        quantity: quantities[item.mat_id],
        material_name: item.mat_name,
        supply_price: item.price,
      }));

    if (!items.length) {
      return message.warning("Please select quantities for items");
    }

    setOrderItems(items);
    setOrderModalVisible(true);
  };

  const handleRemoveItem = (material_id) => {
    const updatedItems = orderItems.filter(item => item.material_id !== material_id);
    setOrderItems(updatedItems);

    const newQuantities = { ...quantities };
    delete newQuantities[material_id];
    setQuantities(newQuantities);
  };

  const formatPrice = (price) => price && !isNaN(price) ? price.toFixed(2) : "0.00";

  const generatePDF = async () => {
    try {
      if (!slipRef.current) {
        throw new Error("Receipt not ready");
      }

      const input = slipRef.current;
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      // เพิ่มชื่อผู้สั่งลงใน slip ก่อนดาวน์โหลด
      // pdf.text(`Ordered by: ${employeeName}`, 10, 10);  // แสดงชื่อผู้สั่ง

      pdf.save(`Order_${newVendorId || "temp"}.pdf`);

      setIsReceiptDownloaded(true);
    } catch (error) {
      console.error("Error generating PDF:", error);
      message.error("Failed to generate PDF");
    }
  };

  const confirmOrder = async () => {
    try {
      setLoading(true);

      const tempOrderId = `temp_${Date.now()}`;
      setNewVendorId(tempOrderId);

      setSavedOrderItems(orderItems);
      setSavedTotal(orderTotal);

      const orderData = {
        order_id: tempOrderId,
        items: orderItems,
        total: orderTotal,
        date: new Date().toISOString(),
        status: 'pending'
      };

      // Model prototype
//  const r =     [
//   {
//     "unit": "ขวด",
//     "quantity": 10,
//     "product_id": 101,
//     "unit_price": 25.5,
//     "product_name": "เครื่องดื่มเกลือแร่"
//   },
//   {
//     "unit": "ขวด",
//     "quantity": 20,
//     "product_id": 102,
//     "unit_price": 7,
//     "product_name": "น้ำดื่ม 600ml"
//   }
// ]

const  containItemMapping=orderItems.map((result)=>{
  // mapping each item on object 
  return {
  "product_name":result.material_name,
  "quantity":result.quantity,
  "unit_price":result.supply_price
}
})


const  user =  JSON.parse(localStorage.getItem("user")) || null;
await axios.post("http://127.0.0.1:4000/supplierorderhistory/SupplierOrderHistory/create", {
     supplier_id:"2",
     employee_id:user.result.id,
     items:containItemMapping
    },{
      headers:{
        authorization:"Bearer "+auth
      }
    });
  
      // Modal.success({
      //   title: "Order Saved Successfully",
      //   content: (
      //     <div>
      //       <p>Order saved. Now you can download your receipt.</p>
      //       <p>Order ID: <strong>{tempOrderId}</strong></p>
      //       <Button
      //         type="default"
      //         size="large"
      //         onClick={generatePDF}
      //         style={{ width: "100%", marginTop: 16 }}
      //         disabled={isReceiptDownloaded}
      //       >
      //         📥 Download Receipt
      //       </Button>
      //     </div>
      //   ),
      // });

      setIsReceiptReady(true);

      // Clear data after confirmation
      setQuantities({});
      setOrderItems([]);
      setOrderTotal(0);
      setIsReceiptDownloaded(false);
      setOrderModalVisible(false);
    } catch (error) {
      console.error("Error:", error);
      Modal.error({
        title: "Error",
        content: (
          <div>
            <p>Failed to process order</p>
            <p>Error: {error.message}</p>
          </div>
        ),
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = orderItems.reduce(
    (sum, item) => sum + (item.quantity * item.supply_price),
    0
  );

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <Spin size="large" tip="Loading data..." />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        maxWidth: 1200,
        margin: "auto",
        padding: "24px",
      }}
    >
      {/* Scrollable Content */}
      <div
        className="custom-scrollbar"
        style={{
          flexGrow: 1,
          overflowY: "auto",
          position: "relative",
          paddingBottom: 70,
        }}
      >
        {/* Header */}
        <Title level={3}>🛒 Purchase Order</Title>
        <Text type="secondary">Select quantities and confirm order</Text>
  
        {/* Material Cards */}
        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          {materials.map((item) => (
            <Col xs={24} sm={12} md={8} key={item.mat_id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={item.mat_name}
                    src={item.img_url}
                    style={{ height: 180, objectFit: "cover" }}
                  />
                }
              >
                <Title level={5}>{item.mat_name}</Title>
                <Text>🏷️ Supplier: {item.vendor_name}</Text><br />
                <Text>💸 Price: {item.price} THB</Text><br />
                <Text>⏱️ Lead time: 2 days</Text>
                <Divider style={{ margin: "12px 0" }} />
                <InputNumber
                  min={0}
                  value={quantities[item.mat_id] || 0}
                  onChange={(val) => handleQtyChange(item.mat_id, val)}
                  style={{ width: "100%" }}
                  placeholder="Quantity"
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
  
      {/* Floating Total */}
      <div
        style={{
          position: "fixed",    // <<< ให้ลอย
          bottom: 24,           // <<< ห่างจากขอบล่าง
          right: 24,            // <<< ห่างจากขอบขวา
          background: "#fff",
          padding: "16px 24px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          borderRadius: "12px",
          zIndex: 200,
          minWidth: 250,
          textAlign: "center",
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          💰 Total: {orderTotal} THB
        </Title>
        <Button
          type="primary"
          size="large"
          disabled={Object.values(quantities).every((q) => q === 0)}
          onClick={handleOrder}
          style={{ marginTop: 8, width: "100%" }}
        >
          ✅ Confirm Order
        </Button>
      </div>
  
      {/* Review Order Modal */}
      <Modal
        title="📦 Review Your Order (Temporary)"
        open={isOrderModalVisible}
        onCancel={() => setOrderModalVisible(false)}
        onOk={confirmOrder}
        okText="✅ Save Temporarily"
        cancelText="❌ Cancel"
        okButtonProps={{ loading }}
      >
        {orderItems.length > 0 ? (
          <>
            {orderItems.map((item) => (
              <div
                key={item.material_id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <div>
                  <strong>{item.material_name}</strong> - {item.quantity} x {item.supply_price} THB
                </div>
                <Button
                  type="link"
                  icon={<span style={{ color: "red" }}>❌</span>}
                  onClick={() => handleRemoveItem(item.material_id)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Divider />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              <span>Total</span>
              <span>{orderTotal} THB</span>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", color: "#999" }}>
            <p>No items found</p>
          </div>
        )}
      </Modal>
  
      {/* Hidden Printable Slip */}
      <div
        ref={slipRef}
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: 500,
          padding: 20,
          fontFamily: "Arial, sans-serif",
          background: "white",
          minHeight: 120,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Title level={2} style={{ marginBottom: 10 }}>
            🧾 Purchase Order Slip
          </Title>
          <Text type="secondary">
            Order ID: <strong>{newVendorId}</strong>
          </Text>
          <br />
          <Text type="secondary">Date: {new Date().toLocaleString()}</Text>
          <br />
          <Text type="secondary">
            Ordered by: <strong>{employeeName}</strong>
          </Text>
          <Divider />
        </div>
  
        <div style={{ marginTop: 16 }}>
          {savedOrderItems.map((item) => (
            <div
              key={item.material_id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <div>
                <strong>{item.material_name}</strong><br />
                <Text>{item.quantity} x {item.supply_price} THB</Text>
              </div>
              <div style={{ textAlign: "right" }}>
                <strong>{formatPrice(item.quantity * item.supply_price)} THB</strong>
              </div>
            </div>
          ))}
          <Divider />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            <span>Total</span>
            <span>{formatPrice(savedTotal)} THB</span>
          </div>
        </div>
  
        <Divider />
        <Text
          type="secondary"
          style={{ textAlign: "center", display: "block", fontSize: 12 }}
        >
          Thank you for your order!
        </Text>
      </div>
    </div>
  );
  
  
};

export default VendorPage;
