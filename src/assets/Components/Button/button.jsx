import React from 'react'
// import './button.css'

function Mybutton({size,topic,process}) {
  return (
    <button style={{minWidth:size === undefined?'100px':size+'px', maxHeight: size === undefined?'80px':size+'px'}} onClick={process}>  {topic}</button>
  )
}

export default Mybutton


