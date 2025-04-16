import React, { useState } from "react";
import {
  Select,
  Card,
  InputNumber,
  Button,
  Typography,
  Row,
  Col,
  message,
  Divider,
  FloatButton,
} from "antd";

const { Title, Text } = Typography;
const { Option } = Select;

// Mock supplier + materials (with image)
const mockSuppliers = [
  { supplier_id: 1, supplier_name: "Fresh Leaf Co." },
  { supplier_id: 2, supplier_name: "Bubble Delight Supplier" },
];

const mockMaterials = {
  1: [
    {
      material_id: 101,
      material_name: "ชาเขียว",
      supply_price: 35,
      lead_time_days: 3,
      img_url: "https://source.unsplash.com/featured/?greentea",
    },
    {
      material_id: 102,
      material_name: "นมสด",
      supply_price: 28,
      lead_time_days: 2,
      img_url: "https://source.unsplash.com/featured/?milk",
    },
  ],
  2: [
    {
      material_id: 201,
      material_name: "ไข่มุกดำ",
      supply_price: 40,
      lead_time_days: 1,
      img_url: "https://source.unsplash.com/featured/?tapioca",
    },
    {
      material_id: 202,
      material_name: "เยลลี่ลิ้นจี่",
      supply_price: 45,
      lead_time_days: 2,
      img_url: "https://source.unsplash.com/featured/?lychee",
    },
  ],
};

const VendorPage = () => {
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);
  const [orderQuantities, setOrderQuantities] = useState({});

  const handleQtyChange = (id, value) => {
    setOrderQuantities({ ...orderQuantities, [id]: value });
  };

  const handleOrder = () => {
    const items = mockMaterials[selectedSupplierId]
      .filter((item) => orderQuantities[item.material_id] > 0)
      .map((item) => ({
        material_id: item.material_id,
        quantity: orderQuantities[item.material_id],
      }));

    if (!items.length) {
      return message.warning("กรุณาเลือกจำนวนสินค้าที่ต้องการสั่งก่อน");
    }

    console.log("🧾 รายการสั่ง:", items);
    message.success("สั่งซื้อเรียบร้อย!");
    setOrderQuantities({});
  };

  const total = selectedSupplierId
    ? mockMaterials[selectedSupplierId].reduce(
        (sum, item) =>
          sum + (orderQuantities[item.material_id] || 0) * item.supply_price,
        0
      )
    : 0;

  return (
    <div className="p-6" style={{ maxWidth: 1200, margin: "auto" }}>
      <Title level={3}>🛒 สั่งซื้อวัตถุดิบจาก Supplier</Title>

      <Select
        placeholder="เลือก Supplier"
        style={{ width: 300, marginBottom: 24 }}
        onChange={setSelectedSupplierId}
        value={selectedSupplierId}
      >
        {mockSuppliers.map((sup) => (
          <Option key={sup.supplier_id} value={sup.supplier_id}>
            {sup.supplier_name}
          </Option>
        ))}
      </Select>

      {selectedSupplierId && (
        <>
          <Row gutter={[16, 16]}>
            {mockMaterials[selectedSupplierId].map((item) => (
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
                  <Text>📦 ราคา: {item.supply_price} บาท</Text>
                  <br />
                  <Text>🚚 ส่งใน {item.lead_time_days} วัน</Text>
                  <Divider style={{ margin: "12px 0" }} />
                  <InputNumber
                    min={0}
                    value={orderQuantities[item.material_id] || 0}
                    onChange={(val) => handleQtyChange(item.material_id, val)}
                    placeholder="จำนวนที่ต้องการ"
                    style={{ width: "100%" }}
                  />
                </Card>
              </Col>
            ))}
          </Row>

          <div style={{ marginTop: 40, textAlign: "right" }}>
            <Title level={4}>ยอดรวม: {total} บาท</Title>
            <Button
              type="primary"
              size="large"
              onClick={handleOrder}
              disabled={total === 0}
            >
              ✅ ยืนยันการสั่งซื้อ
            </Button>
          </div>
        </>
      )}

      <FloatButton.BackTop />
    </div>
  );
};

export default VendorPage;
