import React from 'react'
import SvgDownloader from './SvgDownloader'

export default ({ title, text, docId }) => (
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
    {docId ? <SvgDownloader docId={docId} style={{marginLeft: '5px'}}/> : undefined}
  </div>
)
