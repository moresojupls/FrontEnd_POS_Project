import React, { useEffect } from 'react'

function AlertBox({ message, type = 'info', onClose, duration = 3000 }) {
  
  // สั่งจับเวลา: เมื่อ Alert ปรากฏขึ้น จะเริ่มนับถอยหลังเพื่อปิดตัวเอง
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(); // เรียกฟังก์ชันปิดที่ส่งมาจาก Component แม่
      }, duration);

      return () => clearTimeout(timer); // ล้างคิวทิ้งถ้ามีการปิดก่อนเวลา
    }
  }, [duration, onClose]);

  // กำหนดสีและข้อความตามประเภท
  const config = {
    success: { bg: '#d4edda', border: '#c3e6cb', text: '#155724' },
    error: { bg: '#f8d7da', border: '#f5c6cb', text: '#721c24' },
    info: { bg: '#d1ecf1', border: '#bee5eb', text: '#0c5460' },
    warning: { bg: '#fff3cd', border: '#ffeeba', text: '#856404' }
  };

  const selected = config[type] || config.info;

  const style = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 9999,
    minWidth: '250px',
    maxWidth: '350px',
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: selected.bg,
    color: selected.text,
    border: `1px solid ${selected.border}`,
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    fontFamily: 'sans-serif',
    animation: 'slideIn 0.3s ease-out' // แก้จาก 5s เป็น 0.3s จะได้ไม่ช้าเกินไปครับ
  };

  return (
    <>
      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}
      </style>

      <div style={style}>
        <div style={{ marginRight: '10px', fontSize: '14px', fontWeight: '500' }}>
          {message || 'การแจ้งเตือน'}
        </div>
        {onClose && (
          <button 
            onClick={onClose} 
            style={{ 
              cursor: 'pointer', 
              border: 'none', 
              background: 'none', 
              fontSize: '18px',
              color: 'inherit',
              padding: '0 0 0 10px',
              lineHeight: '1'
            }}
          >
            &times;
          </button>
        )}
      </div>
    </>
  )
}

export default AlertBox