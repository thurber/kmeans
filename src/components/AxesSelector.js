import React from 'react'
import Select from 'muicss/lib/react/select'
import Option from 'muicss/lib/react/option'

export default ({headers, xIndex, yIndex, setX, setY}) => (
  headers && headers.count() > 2 ?
    <div
      style={{
        display: 'inline-block',
        width: '230px',
        marginTop: '10px',
        verticalAlign: 'text-top',
      }}
    >
      <Select
        label='X Axis'
        value={xIndex}
        onChange={(e) => {
          setX(e.target.value)
        }}
      >
        {headers.map((h, i) => (
          <Option key={'x-' + i} value={i} label={h}/>
        )).toArray()}
      </Select>
      <Select
        label='Y Axis'
        value={yIndex}
        onChange={(e) => {
          setY(e.target.value)
        }}
      >
        {headers.map((h, i) => (
          <Option key={'y' + i} value={i} label={h}/>
        )).toArray()}
      </Select>
    </div>
    :
    null
)
