import React from 'react'

function Mybutton({topic,process}) {
  return (
    <button style={{minWidth:'20px'}} onClick={process}>  {topic}</button>
  )
}

export default Mybutton


