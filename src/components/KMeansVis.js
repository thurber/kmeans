import React from 'react'
import * as d3 from 'd3'
import Svg from './Svg'
import Panel from 'muicss/lib/react/panel'
import AxesSelector from '../containers/AxesSelector'
import Caption from './Caption'
import colors from '../styles/colors'

export default ({ data, xIndex, yIndex, kmeans, width, height, margin }) => {
  
  width = width ? width : 200
  height = height ? height : 200
  margin = margin ? margin : 0

  let scaleMin = 0
  for (let i = 0; i < data.count(); i++) {
    if (!data.get(i).every(d => d >= 0)) {
      scaleMin = -1
      break
    }
  }

  let x = d3.scaleLinear().range([0, width]).domain([scaleMin, 1])
  let y = d3.scaleLinear().range([height, 0]).domain([scaleMin, 1])

  let xAxis = (
    <g>
      <line
        x1={x(scaleMin)}
        x2={x(1)}
        y1={y(0)}
        y2={y(0)}
        style={{
          stroke: 'gray',
          opacity: 0.5,
          strokeWidth: width/200,
          shapeRendering: 'crispEdges',
        }}
      />
    </g>
  )

  let yAxis = (
    <g>
      <line
        y1={y(scaleMin)}
        y2={y(1)}
        x1={x(0)}
        x2={x(0)}
        style={{
          stroke: 'gray',
          opacity: 0.5,
          strokeWidth: width/200,
          shapeRendering: 'crispEdges',
        }}
      />
    </g>
  )

  return (
    <div>
      <div
        style={{
          display: 'inline-block',
          verticalAlign: 'text-top',
          marginRight: '30px',
          width: width + 2 * margin + 30 + 'px',
        }}
      >
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
            {xAxis}
            {yAxis}
            {data.map((d, i) => (
              <circle
                key={'datum-' + i}
                cx={x(d[xIndex])}
                cy={y(d[yIndex])}
                r={width/200}
                fill={colors(kmeans.get('clusters')[i])}
              />
            ))}
            {kmeans.get('centers').map((d, i) => (
              <circle
                key={'center-' + i}
                cx={x(d[xIndex])}
                cy={y(d[yIndex])}
                r={width/100}
                fill='none'
                stroke={'black'}
              />
            ))}
          </Svg>
        </Panel>
        <Caption
          title='Figure 7:'
          text='k-means++ clusters'
        />
      </div>
      <AxesSelector/>
    </div>
  )
}
