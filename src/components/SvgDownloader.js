import React from 'react'

export default ({docId, style}) => (
  <span style={style}>
    (
    <a
      style={{cursor: 'pointer',}}
      onClick={() => {
        try {
          let a = document.createElement('a')
          a.href = 'data:image/svg+xml;utf8,' + unescape(document.getElementById(docId).outerHTML)
          a.target = '_blank'
          a.download = docId + '.svg'
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        }
        catch(e) {}
      }}
    >
      download
    </a>
    )
  </span>
)
