import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Mybutton from './assets/Components/Button/button'
import Myimg from './assets/Components/Image/img'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import Mynavbar from './assets/Components/Navbar/navbar'




function App() {
  const [count, setCount] = useState(0)

  return(
    <> 
      <Mynavbar />

      <div>
        <Mybutton topic={"done"} process={()=>{
          alert('sdadas')
        }} />
      </div>
      <div>
        <Mybutton topic={"Hold Order"} process={()=>{
          alert('Holdd')
        }}/>
      </div>

      <div>
        <Myimg url={"https://images.unsplash.com/photo-1542452376175-82b6fb643412?q=80&w=1901&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}size={150} />
      </div>
    </>
  )
}

export default App
