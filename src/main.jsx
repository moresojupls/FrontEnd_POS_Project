import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import MyRouter from './Router';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <MyRouter/>
  </StrictMode>,
)
