import React, { useState, useEffect, useRef } from "react";
import { Card, Row, Col, Typography, InputNumber, Button, Divider, message, Modal, Spin } from "antd";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:4000/materials/materials/");
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      const formattedMaterials = data.result.map((item) => ({
        material_id: item.mat_id,
        material_name: item.mat_name,
        supply_price: parseFloat(item.price),
        lead_time_days: 2,
        img_url: item.img_url || "https://source.unsplash.com/featured/?ingredient",
        supplier_name: item.vendor_name || "Unknown",
      }));

      setMaterials(formattedMaterials);
    } catch (error) {
      console.error(error);
      message.warning("Using temporary data due to fetch failure");
      setMaterials(getSampleMaterials());
    } finally {
      setLoading(false);
    }
  };

  const getSampleMaterials = () => [
    {
      material_id: 1,
      material_name: "Wheat Flour",
      supply_price: 50,
      lead_time_days: 2,
      img_url: "https://source.unsplash.com/featured/?flour",
      supplier_name: "Bakery Shop",
    },
    {
      material_id: 2,
      material_name: "Sugar",
      supply_price: 30,
      lead_time_days: 2,
      img_url: "https://source.unsplash.com/featured/?sugar",
      supplier_name: "Bakery Shop",
    },
  ];

  const [orderTotal, setOrderTotal] = useState(0);
  const handleQtyChange = (id, value) => {
    const newQuantities = { ...quantities, [id]: value };
    setQuantities(newQuantities);

    const calculateTotal = materials.reduce((sum, item) => {
      const qty = newQuantities[item.material_id] || 0;
      return sum + qty * item.supply_price;
    }, 0);

    setOrderTotal(calculateTotal);
  };

  const handleOrder = () => {
    const items = materials
      .filter((item) => quantities[item.material_id] > 0)
      .map((item) => ({
        material_id: item.material_id,
        quantity: quantities[item.material_id],
        material_name: item.material_name,
        supply_price: item.supply_price,
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

      Modal.success({
        title: "Order Saved Successfully",
        content: (
          <div>
            <p>Order saved. Now you can download your receipt.</p>
            <p>Order ID: <strong>{tempOrderId}</strong></p>
            <Button
              type="default"
              size="large"
              onClick={generatePDF}
              style={{ width: "100%", marginTop: 16 }}
              disabled={isReceiptDownloaded}
            >
              📥 Download Receipt
            </Button>
          </div>
        ),
      });

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
    <div style={{ maxWidth: 1200, margin: "auto", padding: "24px", height: "100vh", overflowY: "auto", position: "relative" }}>
      <Title level={3}>🛒 Purchase Order </Title>
      <Text type="secondary">Select quantities and confirm order</Text>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {materials.map((item) => (
          <Col xs={24} sm={12} md={8} key={item.material_id}>
            <Card hoverable cover={<img alt={item.material_name} src={item.img_url} style={{ height: 180, objectFit: "cover" }} />}>
              <Title level={5}>{item.material_name}</Title>
              <Text>🏷️ Supplier: {item.supplier_name}</Text><br />
              <Text>💸 Price: {item.supply_price} THB</Text><br />
              <Text>⏱️ Lead time: {item.lead_time_days} days</Text>
              <Divider style={{ margin: "12px 0" }} />
              <InputNumber
                min={0}
                value={quantities[item.material_id] || 0}
                onChange={(val) => handleQtyChange(item.material_id, val)}
                style={{ width: "100%" }}
                placeholder="Quantity"
              />
            </Card>
          </Col>
        ))}
      </Row>

      <div style={{ position: "fixed", bottom: 24, right: 24, background: "#fff", padding: 16, boxShadow: "0 0 10px rgba(0,0,0,0.1)", borderRadius: 12, zIndex: 1000 }}>
        <Title level={5} style={{ marginBottom: 12 }}>💰 Total: {orderTotal} THB</Title>

        <Button
          type="primary"
          size="large"
          disabled={Object.values(quantities).every((q) => q === 0)}
          onClick={handleOrder}
          style={{ marginBottom: 8 }}
        >
          ✅ Confirm Order
        </Button>
      </div>

      <Modal
        title="📦 Review Your Order (Temporary)"
        open={isOrderModalVisible}
        onCancel={() => setOrderModalVisible(false)}
        onOk={confirmOrder}
        okText="✅ Save Temporarily"
        cancelText="❌ Cancel"
        okButtonProps={{ loading: loading }}
      >
        {orderItems.length > 0 ? (
          <>
            {orderItems.map((item) => (
              <div key={item.material_id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div>
                  <strong>{item.material_name}</strong> - {item.quantity} x {item.supply_price} THB
                </div>
                <Button type="link" icon={<span style={{ color: "red" }}>❌</span>} onClick={() => handleRemoveItem(item.material_id)}>Remove</Button>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, fontSize: 18, fontWeight: "bold" }}>
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

      <div ref={slipRef} style={{ position: 'absolute', left: '-9999px', top: 0, width: 500, padding: 20, fontFamily: 'Arial, sans-serif', background: 'white' }}>
        <div style={{ textAlign: "center" }}>
          <Title level={2} style={{ marginBottom: 10 }}>🧾 Purchase Order Slip</Title>
          <Text type="secondary">Order ID: <strong>{newVendorId}</strong></Text><br />
          <Text type="secondary">Date: {new Date().toLocaleString()}</Text><br />
          <Divider />
        </div>
        <div style={{ marginTop: 16 }}>
          {savedOrderItems.map((item) => (
            <div key={item.material_id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
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
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: "bold" }}>
            <span>Total</span>
            <span>{formatPrice(savedTotal)} THB</span>
          </div>
        </div>
        <Divider />
        <div style={{ textAlign: "center" }}>
          <Text type="secondary">Thank you for your order!</Text>
        </div>
      </div>
    </div>
  );
};

export default VendorPage;
