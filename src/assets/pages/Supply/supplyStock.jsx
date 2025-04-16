import BubbleTeaShop from '../../Components/CRUD/BubbleTeaShop';
import { useState, useEffect } from 'react';
import { Tag } from 'antd';

export default function SupplyStock() {
  const [result, setResult] = useState(null);
  const [load, setLoad] = useState(false);

  const column = [
    {
      title: 'รหัสสินค้า',
      dataIndex: 'mat_id',
      key: 'mat_id',
      width: 100,
      readonly: true,
    },
    {
      title: 'ชื่อสินค้า',
      dataIndex: 'mat_name',
      key: 'mat_name',
      type: 'input',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'คำอธิบาย',
      dataIndex: 'description',
      key: 'description',
      type: 'textArea',
      ellipsis: true,
    },
    {
      title: 'หมวดหมู่',
      dataIndex: 'category',
      key: 'category',
      type: 'select',
      width: 70,
    },
    {
      title: 'ราคา',
      dataIndex: 'price',
      key: 'price',
      type: 'input',
      width: 120,
    },
    {
      title: 'สถานะ',
      dataIndex: 'active',
      key: 'active',
      type: 'active',
      render: (active) => (
        <Tag color={active ? 'green' : 'red'}>
          {active ? 'เปิดขาย' : 'ปิดขาย'}
        </Tag>
      ),
      width: 100,
    },
    {
      title: 'สร้างเมื่อ',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 150,
      render: (text) => formatDate(text),
    },
    {
      title: 'อัปเดตเมื่อ',
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: 150,
      render: (text) => formatDate(text),
    },
  ];

  const selectOption = ["General", "Powder", "Topping"];

  useEffect(() => {
    fetch("http://127.0.0.1:4000/materials/materials/")
      .then((response) => {
        if (!response.ok) throw new Error("Connection failed");
        return response.json();
      })
      .then((result) => {
        if (result.statusCode !== 200) throw new Error("Fetch error");
        setResult(result);
        setLoad(true);
      })
      .catch((error) => {
        console.error("Fetch failed:", error);
      });
  }, []);

  const formatDate = (text) => {
    if (!text) return '-';
    const date = new Date(text);
    return isNaN(date.getTime())
      ? '-'
      : date.toLocaleString('th-TH', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
  };

  return load ? (
    <BubbleTeaShop
      result={result?.result || []}
      column={column}
      page={"supply"}
      selectOption={selectOption}
    />
  ) : (
    <h1>Loading...</h1>
  );
}
