import React from 'react'
import * as d3 from 'd3'
import Svg from './Svg'
import Panel from 'muicss/lib/react/panel'
import Caption from './Caption'
import colors from '../styles/colors'

export default ({ kmeans, width, height, margin }) => {
  
  width = width ? width : 250
  height = height ? height : 250
  margin = margin ? margin : 0.075

  let x = d3.scaleLinear().range([0, width]).domain([0, 10])
  let y = d3.scaleLinear().range([height, 0]).domain([0, Math.ceil(d3.max(kmeans.map(d => d.get('Wk')).toArray()))])
  
  let xAxis = (
    <g>
      <line
        x1={x(0)}
        x2={x(10)}
        y1={y(0)}
        y2={y(0)}
        style={{
          stroke: 'gray',
          opacity: 0.5,
          strokeWidth: width/200,
          shapeRendering: 'crispEdges',
        }}
      />
      <text
        x={x((x.domain()[1] - x.domain()[0])/2)}
        y={y((y.domain()[0] - y.domain()[1])/20)}
        fontSize='10'
        textAnchor='middle'
        style={{
          dominantBaseline: 'middle',
        }}
      >
        k
      </text>
      <line
        x1={x(x.ticks()[1])}
        x2={x(x.ticks()[1])}
        y1={y(y.domain()[0]) - height / 50}
        y2={y(y.domain()[0]) + height / 50}
        style={{
          stroke: 'gray',
          opacity: 0.5,
          strokeWidth: width/200,
          shapeRendering: 'crispEdges',
        }}
      />
      <text
        x={x(x.ticks()[1])}
        y={y(y.domain()[0]) + 2 * height / 50}
        fontSize='8'
        textAnchor='middle'
        style={{
          dominantBaseline: 'hanging',
          fill: 'gray',
        }}
      >
        {x.ticks()[1]}
      </text>
      <line
        x1={x(x.ticks()[x.ticks().length - 2])}
        x2={x(x.ticks()[x.ticks().length - 2])}
        y1={y(y.domain()[0]) - height / 50}
        y2={y(y.domain()[0]) + height / 50}
        style={{
          stroke: 'gray',
          opacity: 0.5,
          strokeWidth: width/200,
          shapeRendering: 'crispEdges',
        }}
      />
      <text
        x={x(x.ticks()[x.ticks().length - 2])}
        y={y(y.domain()[0]) + 2 * height / 50}
        fontSize='8'
        textAnchor='middle'
        style={{
          dominantBaseline: 'hanging',
          fill: 'gray',
        }}
      >
        {x.ticks()[x.ticks().length - 2]}
      </text>
    </g>
  )
  
  let yAxis = (
    <g>
      <line
        y1={y(y.domain()[1])}
        y2={y(0)}
        x1={x(0)}
        x2={x(0)}
        style={{
          stroke: 'gray',
          opacity: 0.5,
          strokeWidth: width/200,
          shapeRendering: 'crispEdges',
        }}
      />
      <text
        x={x((x.domain()[0] - x.domain()[1])/20)}
        y={y((y.domain()[1] - y.domain()[0])/2)}
        fontSize='10'
        textAnchor='middle'
        writingMode='tb'
        style={{
          dominantBaseline: 'middle',
        }}
      >
        Wk
      </text>
      <line
        y1={y(y.ticks()[0])}
        y2={y(y.ticks()[0])}
        x1={x(x.domain()[0]) - width / 50}
        x2={x(x.domain()[0])}
        style={{
          stroke: 'gray',
          opacity: 0.5,
          strokeWidth: width/200,
          shapeRendering: 'crispEdges',
        }}
      />
      <text
        y={y(y.ticks()[0])}
        x={x(x.domain()[0]) - 2 * height / 50}
        fontSize='8'
        textAnchor='end'
        style={{
          dominantBaseline: 'middle',
          fill: 'gray',
        }}
      >
        {y.ticks()[0]}
      </text>
      <line
        y1={y(y.ticks()[y.ticks().length - 1])}
        y2={y(y.ticks()[y.ticks().length - 1])}
        x1={x(x.domain()[0]) - width / 50}
        x2={x(x.domain()[0]) + width / 50}
        style={{
          stroke: 'gray',
          opacity: 0.5,
          strokeWidth: width/200,
          shapeRendering: 'crispEdges',
        }}
      />
      <text
        y={y(y.ticks()[y.ticks().length - 1])}
        x={x(x.domain()[0]) - 2 * width / 50}
        fontSize='8'
        textAnchor='end'
        style={{
          dominantBaseline: 'middle',
          fill: 'gray',
        }}
      >
        {y.ticks()[y.ticks().length - 1]}
      </text>
    </g>
  )

  return (
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
          docId='fig2'
          width={width}
          height={height}
          margin={margin}
        >
          {xAxis}
          {yAxis}
          {kmeans.map((d, k) => (
            <circle
              key={'Wk-' + k}
              cx={x(k)}
              cy={y(d.get('Wk'))}
              r={width/100}
              fill='none'
              stroke={colors(0)}
            />
          )).toArray()}
        </Svg>
      </Panel>
      <Caption
        docId='fig2'
        title='Figure 2:'
        text='elbow chart'
      />
    </div>
  )
}
