import React from 'react'

function Mybutton({topic,process}) {
  return (
    <button style={{minWidth:'100px', maxWidth: '100px', maxHeight: '80px'}} onClick={process}>  {topic}</button>
  )
}

export default Mybutton


