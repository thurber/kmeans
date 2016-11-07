import React from 'react'

export default ({width, height, margin, children, docId}) => (
  <div
    style={{
      position: 'relative',
      height: '0px',
      width: width + 'px',
      padding: '0px',
      paddingBottom: height,
    }}
  >
    <svg
      id={docId}
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox={(-width * margin) + ' ' + (-height * margin) + ' ' + (width * (1 + 2 * margin)) + ' ' + (height * (1 + 2 * margin))}
      style={{
        position: 'absolute',
        overflow: 'visible',
        width: '100%',
        height: '100%',
        left: '0px',
        right: '0px',
      }}
    >
      {children}
    </svg>
  </div>
)
