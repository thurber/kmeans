import React from 'react'

export default ({ title, text }) => (
  <div
    className='mui--text-caption'
    style={{
      margin: '0 0 10px',
    }}
  >
    <i>
      <strong>{title} </strong>
      {text}
    </i>
  </div>
)
