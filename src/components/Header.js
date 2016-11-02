import React from 'react'
import Divider from 'muicss/lib/react/divider'

export default ({ title }) => (
  <div
    style={{
      margin: '20px 0 10px'
    }}
  >
    <div
      className='mui--text-title'
    >
      {title}
    </div>
    <Divider/>
  </div>
)
