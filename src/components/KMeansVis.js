import React from 'react'
import * as d3 from 'd3'
import Svg from './Svg'
import Panel from 'muicss/lib/react/panel'
import Caption from './Caption'

export default ({ data, kmeans, width, height, margin }) => {
  
  width = width ? width : 200
  height = height ? height : 200
  margin = margin ? margin : 0

  let x = d3.scaleLinear().range([0, width]).domain([-1, 1])
  let y = d3.scaleLinear().range([height, 0]).domain([-1, 1])
  let colors = d3.scaleOrdinal(d3.schemeCategory10)

  return (
    <div>
      <Panel
        style={{
          display: 'inline-block',
          margin: '10px 0 0',
        }}
      >
        <Svg
          width={width}
          height={height}
          margin={margin}
        >
          {data.map((d, i) => (
            <circle
              key={'datum-' + i}
              cx={x(d[0])}
              cy={y(d[1])}
              r={width/200}
              fill={colors(kmeans.get('clusters')[i])}
            />
          ))}
          {kmeans.get('centers').map((d, i) => (
            <circle
              key={'center-' + i}
              cx={x(d[0])}
              cy={y(d[1])}
              r={width/100}
              fill='none'
              stroke={'black'}
            />
          ))}
        </Svg>
      </Panel>
      <Caption
        title='Figure 3:'
        text='k-means clusters'
      />
    </div>
  )
}
