
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

export default function NumberInputBasic() {
  const [value, setValue] = useState(1);

  const handleIncrement = () => {
    setValue(prevValue => prevValue + 1);
  };

  const handleDecrement = () => {
    setValue(prevValue => (prevValue > 0 ? prevValue - 1 : 0));
  };

  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    // ตรวจสอบว่าค่าต้องมากกว่าหรือเท่ากับ 0
    if (newValue >= 0) {
      setValue(newValue);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        type="number"
        value={value}
        onChange={handleChange}
        inputProps={{ min: 1 }} // กำหนดให้ input มีค่าต่ำสุดที่ 0
        variant="outlined"
        style={{ width: '150px', textAlign: 'center' }}
      />
    </div>
  );
}