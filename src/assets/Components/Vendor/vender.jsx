import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  InputNumber,
  Button,
  Divider,
  message,
  FloatButton,
  Modal,
} from "antd";

const { Title, Text } = Typography;

// Mock ข้อมูลวัตถุดิบ
const materials = [
  {
    material_id: 101,
    material_name: "ชาเขียว",
    supplier_name: "Fresh Leaf Co.",
    supply_price: 35,
    lead_time_days: 3,
    img_url: "https://source.unsplash.com/featured/?greentea",
  },
  {
    material_id: 102,
    material_name: "นมสด",
    supplier_name: "Fresh Leaf Co.",
    supply_price: 28,
    lead_time_days: 2,
    img_url: "https://source.unsplash.com/featured/?milk",
  },
  {
    material_id: 201,
    material_name: "ไข่มุกดำ",
    supplier_name: "Bubble Delight Supplier",
    supply_price: 40,
    lead_time_days: 1,
    img_url: "https://source.unsplash.com/featured/?tapioca",
  },
  {
    material_id: 202,
    material_name: "เยลลี่ลิ้นจี่",
    supplier_name: "Bubble Delight Supplier",
    supply_price: 45,
    lead_time_days: 2,
    img_url: "https://source.unsplash.com/featured/?lychee",
  },
];

const VendorPage = () => {
  const [quantities, setQuantities] = useState({});

  const handleQtyChange = (id, value) => {
    setQuantities({ ...quantities, [id]: value });
  };

  const handleOrder = () => {
    const items = materials
      .filter((item) => quantities[item.material_id] > 0)
      .map((item) => ({
        material_id: item.material_id,
        quantity: quantities[item.material_id],
      }));

    if (!items.length) {
      return message.warning("กรุณาเลือกจำนวนสินค้าที่ต้องการสั่งก่อน");
    }

    Modal.confirm({
      title: "คุณแน่ใจหรือไม่?",
      content: `คุณต้องการสั่งซื้อวัตถุดิบทั้งหมดจำนวน ${items.length} รายการใช่ไหม?`,
      okText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onOk() {
        console.log("🧾 รายการสั่งซื้อ:", items);
        message.success("สั่งซื้อเรียบร้อยแล้ว!");
        setQuantities({});
      },
    });
  };

  const total = materials.reduce(
    (sum, item) =>
      sum + (quantities[item.material_id] || 0) * item.supply_price,
    0
  );

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "auto",
        padding: "24px",
        height: "100vh",
        overflowY: "auto",
        position: "relative",
      }}
    >
      <Title level={3}>🛒 สั่งซื้อวัตถุดิบทั้งหมด</Title>
      <Text type="secondary">เลือกจำนวนที่ต้องการแล้วกดยืนยัน</Text>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {materials.map((item) => (
          <Col xs={24} sm={12} md={8} key={item.material_id}>
            <Card
              hoverable
              cover={
                <img
                  alt={item.material_name}
                  src={item.img_url}
                  style={{ height: 180, objectFit: "cover" }}
                />
              }
            >
              <Title level={5}>{item.material_name}</Title>
              <Text>🏷️ Supplier: {item.supplier_name}</Text>
              <br />
              <Text>💸 ราคา: {item.supply_price} บาท</Text>
              <br />
              <Text>⏱️ ส่งใน {item.lead_time_days} วัน</Text>
              <Divider style={{ margin: "12px 0" }} />
              <InputNumber
                min={0}
                value={quantities[item.material_id] || 0}
                onChange={(val) => handleQtyChange(item.material_id, val)}
                style={{ width: "100%" }}
                placeholder="จำนวนที่ต้องการ"
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* ✅ ปุ่มสั่งซื้อแบบลอย */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          background: "#fff",
          padding: 16,
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: 12,
          zIndex: 1000,
        }}
      >
        <Title level={5} style={{ marginBottom: 12 }}>
          💰 ยอดรวม: {total} บาท
        </Title>
        <Button
          type="primary"
          size="large"
          disabled={total === 0}
          onClick={handleOrder}
        >
          ✅ ยืนยันการสั่งซื้อ
        </Button>
      </div>

      <FloatButton.BackTop />
    </div>
  );
};

export default VendorPage;
