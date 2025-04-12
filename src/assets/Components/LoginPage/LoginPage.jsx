import '../LoginPage/LoginPageStyle.css'
import React, { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook } from 'react-icons/fa';
import { GiCoffeeCup } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
   const userData = localStorage.getItem("user");
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const [rememberMe, setRememberMe] = useState(false);
   const [showError,setError] = useState(false);
   const  navigator = useNavigate();
 
   const handleSubmit = (e) => {
     e.preventDefault();
     console.log('Login submitted:', { email, password});
   };
 
  const login =async()=>{
    await fetch('http://127.0.0.1:4000/employees/login',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "email":"dwf",
        "password":"123456789"
      })
    }).then((res)=>{
      return res.json();
    }).then((result)=>{
      if(result.statuscode != 200) throw('Error')
      setError(false);
      localStorage.setItem("user",JSON.stringify(result));
      navigator('/Frontend_POS_Project');
    }).catch((err)=>{
      setError(true);
      // localStorage.removeItem("user");
      console.log('err',err)
    })
  }
  return (
    <div className="login-container">
    {/* ฟองไข่มุกตกแต่ง */}
    <div className="bubble bubble-1"></div>
    <div className="bubble bubble-2"></div>
    {showError ?<h1>Welcome</h1>:<></>}
    <div className="login-card">
      <div className="login-header">
        <GiCoffeeCup className="bubble-icon" />
        <h1>ยินดีต้อนรับ!</h1>
        <p>กรุณาเข้าสู่ระบบเพื่อสั่งชานมไข่มุก</p>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">อีเมล</label>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password">รหัสผ่าน</label>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="form-options">
          <div className="remember-me">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">จดจำฉันไว้</label>
          </div>
          <a href="#" className="forgot-password">ลืมรหัสผ่าน?</a>
        </div>

        <button onClick={login} type="submit" className="login-button">
          เข้าสู่ระบบ
        </button>
      </form>

      {/* <div className="divider">
        <span>หรือเข้าสู่ระบบด้วย</span>
      </div>

      <div className="social-login">
        <button type="button" className="social-button google">
          <FaGoogle className="social-icon" />
          <span>Google</span>
        </button>
        <button type="button" className="social-button facebook">
          <FaFacebook className="social-icon" />
          <span>Facebook</span>
        </button>
      </div> */}

      <div className="signup-link">
        <span>ยังไม่มีบัญชี? </span>
        <a href="#">สมัครสมาชิก</a>
      </div>
    </div>
  </div>
  );
};

export default LoginPage;
