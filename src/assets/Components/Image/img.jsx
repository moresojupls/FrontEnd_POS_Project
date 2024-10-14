import React from 'react'

function Myimg({url,size}) {
  return (
    <div>
        <img
      className="picture"
      src={url}
      width={size}
      height={size}
      style={{borderRadius:"8px"}}
    />
    </div>
  )
}

export default Myimg