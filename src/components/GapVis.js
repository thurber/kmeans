import React from 'react'
import * as d3 from 'd3'
import Svg from './Svg'
import Panel from 'muicss/lib/react/panel'
import Caption from './Caption'
import colors from '../styles/colors'

export default ({ data, xIndex, yIndex, kmeans, gap, width, height, margin }) => {
  
  width = width ? width : 200
  height = height ? height : 200
  margin = margin ? margin : 0.075

  let scaleMin = 0
  for (let i = 0; i < data.count(); i++) {
    if (!data.get(i).every(d => d >= 0)) {
      scaleMin = -1
      break
    }
  }

  let x = d3.scaleLinear().range([0, width]).domain([scaleMin, 1])
  let y = d3.scaleLinear().range([height, 0]).domain([scaleMin, 1])

  let xw = d3.scaleLinear().range([0, width]).domain([0, 10]).nice()
  let yw = d3.scaleLinear().range([height, 0]).domain([
    Math.floor(d3.min(Object.keys(gap.get('Wk')).map(k => gap.get('Wk')[k]))),
    Math.ceil(d3.max(Object.keys(gap.get('Wkb')).map(k => gap.get('Wkb')[k])))
  ]).nice()
  
  let yg = d3.scaleLinear().range([height, 0]).domain([
    Math.floor(d3.min(Object.keys(gap.get('gap')).map(k => gap.get('gap')[k]))),
    Math.ceil(d3.max(Object.keys(gap.get('gap')).map(k => gap.get('gap')[k])))
  ]).nice()

  let yd = d3.scaleLinear().range([height, 0]).domain([
    Math.floor(d3.min(Object.keys(gap.get('delta')).map(k => gap.get('delta')[k])) * 50)/50,
    Math.ceil(d3.max(Object.keys(gap.get('delta')).map(k => gap.get('delta')[k])) * 50)/50
  ]).nice().nice()
  
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

  let xwAxis = (
    <g>
      <line
        x1={xw(0)}
        x2={xw(10)}
        y1={yw(yw.domain()[0])}
        y2={yw(yw.domain()[0])}
        style={{
          stroke: 'gray',
          opacity: 0.5,
          strokeWidth: width/200,
          shapeRendering: 'crispEdges',
        }}
      />
      <text
        x={xw((xw.domain()[1] - xw.domain()[0])/2)}
        y={yw(yw.domain()[0] + (yw.domain()[0] - yw.domain()[1])/20)}
        fontSize='10'
        textAnchor='middle'
        style={{
          dominantBaseline: 'middle',
          color: 'gray',
        }}
      >
        k
      </text>
      <line
        x1={xw(xw.ticks()[1])}
        x2={xw(xw.ticks()[1])}
        y1={yw(yw.domain()[0]) - height / 50}
        y2={yw(yw.domain()[0]) + height / 50}
        style={{
          stroke: 'gray',
          opacity: 0.5,
          strokeWidth: width/200,
          shapeRendering: 'crispEdges',
        }}
      />
      <text
        x={xw(xw.ticks()[1])}
        y={yw(yw.domain()[0]) + 2 * height / 50}
        fontSize='8'
        textAnchor='middle'
        style={{
          dominantBaseline: 'hanging',
          fill: 'gray',
        }}
      >
        {xw.ticks()[1]}
      </text>
      <line
        x1={xw(xw.ticks()[xw.ticks().length - 2])}
        x2={xw(xw.ticks()[xw.ticks().length - 2])}
        y1={yw(yw.domain()[0]) - height / 50}
        y2={yw(yw.domain()[0]) + height / 50}
        style={{
          stroke: 'gray',
          opacityw: 0.5,
          strokeWidth: width/200,
          shapeRendering: 'crispEdges',
        }}
      />
      <text
        x={xw(xw.ticks()[xw.ticks().length - 2])}
        y={yw(yw.domain()[0]) + 2 * height / 50}
        fontSize='8'
        textAnchor='middle'
        style={{
          dominantBaseline: 'hanging',
          fill: 'gray',
        }}
      >
        {xw.ticks()[xw.ticks().length - 2]}
      </text>
    </g>
  )
  
  let ywAxis = (
    <g>
      <line
        y1={yw(yw.domain()[1])}
        y2={yw(yw.domain()[0])}
        x1={xw(0)}
        x2={xw(0)}
        style={{
          stroke: 'gray',
          opacity: 0.5,
          strokeWidth: width/200,
          shapeRendering: 'crispEdges',
        }}
      />
      <text
        x={xw((xw.domain()[0] - xw.domain()[1])/20)}
        y={yw((yw.domain()[1] - yw.domain()[0])/2)}
        y={yw(yw.domain()[0] + (yw.domain()[1] - yw.domain()[0])/2)}
        fontSize='10'
        textAnchor='middle'
        writingMode='tb'
        style={{
          dominantBaseline: 'middle',
          color: 'gray',
        }}
      >
        log Wk
      </text>
      <line
        y1={yw(yw.ticks()[0])}
        y2={yw(yw.ticks()[0])}
        x1={xw(xw.domain()[0]) - width / 50}
        x2={xw(xw.domain()[0])}
        style={{
          stroke: 'gray',
          opacity: 0.5,
          strokeWidth: width/200,
          shapeRendering: 'crispEdges',
        }}
      />
      <text
        y={yw(yw.ticks()[0])}
        x={xw(xw.domain()[0]) - 2 * height / 50}
        fontSize='8'
        textAnchor='end'
        style={{
          dominantBaseline: 'middle',
          fill: 'gray',
        }}
      >
        {yw.ticks()[0]}
      </text>
      <line
        y1={yw(yw.ticks()[yw.ticks().length - 1])}
        y2={yw(yw.ticks()[yw.ticks().length - 1])}
        x1={xw(xw.domain()[0]) - width / 50}
        x2={xw(xw.domain()[0]) + width / 50}
        style={{
          stroke: 'gray',
          opacity: 0.5,
          strokeWidth: width/200,
          shapeRendering: 'crispEdges',
        }}
      />
      <text
        y={yw(yw.ticks()[yw.ticks().length - 1])}
        x={xw(xw.domain()[0]) - 2 * width / 50}
        fontSize='8'
        textAnchor='end'
        style={{
          dominantBaseline: 'middle',
          fill: 'gray',
        }}
      >
        {yw.ticks()[yw.ticks().length - 1]}
      </text>
    </g>
  )
  
  let xgAxis = (
    <g>
      <line
        x1={xw(0)}
        x2={xw(10)}
        y1={yg(yg.domain()[0])}
        y2={yg(yg.domain()[0])}
        style={{
          stroke: 'gray',
          opacity: 0.5,
          strokeWidth: width/200,
          shapeRendering: 'crispEdges',
        }}
      />
      <text
        x={xw((xw.domain()[1] - xw.domain()[0])/2)}
        y={yg(yg.domain()[0] + (yg.domain()[0] - yg.domain()[1])/20)}
        fontSize='10'
        textAnchor='middle'
        style={{
          dominantBaseline: 'middle',
          color: 'gray',
        }}
      >
        k
      </text>
      <line
        x1={xw(xw.ticks()[1])}
        x2={xw(xw.ticks()[1])}
        y1={yg(yg.domain()[0]) - height / 50}
        y2={yg(yg.domain()[0]) + height / 50}
        style={{
          stroke: 'gray',
          opacity: 0.5,
          strokeWidth: width/200,
          shapeRendering: 'crispEdges',
        }}
      />
      <text
        x={xw(xw.ticks()[1])}
        y={yg(yg.domain()[0]) + 2 * height / 50}
        fontSize='8'
        textAnchor='middle'
        style={{
          dominantBaseline: 'hanging',
          fill: 'gray',
        }}
      >
        {xw.ticks()[1]}
      </text>
      <line
        x1={xw(xw.ticks()[xw.ticks().length - 2])}
        x2={xw(xw.ticks()[xw.ticks().length - 2])}
        y1={yg(yg.domain()[0]) - height / 50}
        y2={yg(yg.domain()[0]) + height / 50}
        style={{
          stroke: 'gray',
          opacityg: 0.5,
          strokeWidth: width/200,
          shapeRendering: 'crispEdges',
        }}
      />
      <text
        x={xw(xw.ticks()[xw.ticks().length - 2])}
        y={yg(yg.domain()[0]) + 2 * height / 50}
        fontSize='8'
        textAnchor='middle'
        style={{
          dominantBaseline: 'hanging',
          fill: 'gray',
        }}
      >
        {xw.ticks()[xw.ticks().length - 2]}
      </text>
    </g>
  )
  
  let ygAxis = (
    <g>
      <line
        y1={yg(yg.domain()[1])}
        y2={yg(yg.domain()[0])}
        x1={xw(0)}
        x2={xw(0)}
        style={{
          stroke: 'gray',
          opacity: 0.5,
          strokeWidth: width/200,
          shapeRendering: 'crispEdges',
        }}
      />
      <text
        x={xw((xw.domain()[0] - xw.domain()[1])/20)}
        y={yg((yg.domain()[1] - yg.domain()[0])/2)}
        y={yg(yg.domain()[0] + (yg.domain()[1] - yg.domain()[0])/2)}
        fontSize='10'
        textAnchor='middle'
        writingMode='tb'
        style={{
          dominantBaseline: 'middle',
          color: 'gray',
        }}
      >
        Gap
      </text>
      <line
        y1={yg(yg.ticks()[0])}
        y2={yg(yg.ticks()[0])}
        x1={xw(xw.domain()[0]) - width / 50}
        x2={xw(xw.domain()[0])}
        style={{
          stroke: 'gray',
          opacity: 0.5,
          strokeWidth: width/200,
          shapeRendering: 'crispEdges',
        }}
      />
      <text
        y={yg(yg.ticks()[0])}
        x={xw(xw.domain()[0]) - 2 * height / 50}
        fontSize='8'
        textAnchor='end'
        style={{
          dominantBaseline: 'middle',
          fill: 'gray',
        }}
      >
        {yg.ticks()[0]}
      </text>
      <line
        y1={yg(yg.ticks()[yg.ticks().length - 1])}
        y2={yg(yg.ticks()[yg.ticks().length - 1])}
        x1={xw(xw.domain()[0]) - width / 50}
        x2={xw(xw.domain()[0]) + width / 50}
        style={{
          stroke: 'gray',
          opacity: 0.5,
          strokeWidth: width/200,
          shapeRendering: 'crispEdges',
        }}
      />
      <text
        y={yg(yg.ticks()[yg.ticks().length - 1])}
        x={xw(xw.domain()[0]) - 2 * width / 50}
        fontSize='8'
        textAnchor='end'
        style={{
          dominantBaseline: 'middle',
          fill: 'gray',
        }}
      >
        {yg.ticks()[yg.ticks().length - 1]}
      </text>
    </g>
  )
  
  let xdAxis = (
    <g>
      <line
        x1={xw(0)}
        x2={xw(10)}
        y1={yd(yd.domain()[0])}
        y2={yd(yd.domain()[0])}
        style={{
          stroke: 'gray',
          opacity: 0.5,
          strokeWidth: width/200,
          shapeRendering: 'crispEdges',
        }}
      />
      <text
        x={xw((xw.domain()[1] - xw.domain()[0])/2)}
        y={yd(yd.domain()[0] + (yd.domain()[0] - yd.domain()[1])/20)}
        fontSize='10'
        textAnchor='middle'
        style={{
          dominantBaseline: 'middle',
          color: 'gray',
        }}
      >
        k
      </text>
      <line
        x1={xw(xw.ticks()[1])}
        x2={xw(xw.ticks()[1])}
        y1={yd(yd.domain()[0]) - height / 50}
        y2={yd(yd.domain()[0]) + height / 50}
        style={{
          stroke: 'gray',
          opacity: 0.5,
          strokeWidth: width/200,
          shapeRendering: 'crispEdges',
        }}
      />
      <text
        x={xw(xw.ticks()[1])}
        y={yd(yd.domain()[0]) + 2 * height / 50}
        fontSize='8'
        textAnchor='middle'
        style={{
          dominantBaseline: 'hanging',
          fill: 'gray',
        }}
      >
        {xw.ticks()[1]}
      </text>
      <line
        x1={xw(xw.ticks()[xw.ticks().length - 2])}
        x2={xw(xw.ticks()[xw.ticks().length - 2])}
        y1={yd(yd.domain()[0]) - height / 50}
        y2={yd(yd.domain()[0]) + height / 50}
        style={{
          stroke: 'gray',
          opacityd: 0.5,
          strokeWidth: width/200,
          shapeRendering: 'crispEdges',
        }}
      />
      <text
        x={xw(xw.ticks()[xw.ticks().length - 2])}
        y={yd(yd.domain()[0]) + 2 * height / 50}
        fontSize='8'
        textAnchor='middle'
        style={{
          dominantBaseline: 'hanging',
          fill: 'gray',
        }}
      >
        {xw.ticks()[xw.ticks().length - 2]}
      </text>
    </g>
  )
  
  let ydAxis = (
    <g>
      <line
        y1={yd(yd.domain()[1])}
        y2={yd(yd.domain()[0])}
        x1={xw(0)}
        x2={xw(0)}
        style={{
          stroke: 'gray',
          opacity: 0.5,
          strokeWidth: width/200,
          shapeRendering: 'crispEdges',
        }}
      />
      <text
        x={xw((xw.domain()[0] - xw.domain()[1])/20)}
        y={yd((yd.domain()[1] - yd.domain()[0])/2)}
        y={yd(yd.domain()[0] + (yd.domain()[1] - yd.domain()[0])/2)}
        fontSize='10'
        textAnchor='middle'
        writingMode='tb'
        style={{
          dominantBaseline: 'middle',
          color: 'gray',
        }}
      >
        Gap(k) - ( Gap(k+1) - s(k+1) )
      </text>
      <line
        y1={yd(yd.ticks()[0])}
        y2={yd(yd.ticks()[0])}
        x1={xw(xw.domain()[0]) - width / 50}
        x2={xw(xw.domain()[0])}
        style={{
          stroke: 'gray',
          opacity: 0.5,
          strokeWidth: width/200,
          shapeRendering: 'crispEdges',
        }}
      />
      <text
        y={yd(yd.ticks()[0])}
        x={xw(xw.domain()[0]) - 2 * height / 50}
        fontSize='8'
        textAnchor='end'
        style={{
          dominantBaseline: 'middle',
          fill: 'gray',
        }}
      >
        {yd.ticks()[0]}
      </text>
      <line
        y1={yd(yd.ticks()[yd.ticks().length - 1])}
        y2={yd(yd.ticks()[yd.ticks().length - 1])}
        x1={xw(xw.domain()[0]) - width / 50}
        x2={xw(xw.domain()[0]) + width / 50}
        style={{
          stroke: 'gray',
          opacity: 0.5,
          strokeWidth: width/200,
          shapeRendering: 'crispEdges',
        }}
      />
      <text
        y={yd(yd.ticks()[yd.ticks().length - 1])}
        x={xw(xw.domain()[0]) - 2 * width / 50}
        fontSize='8'
        textAnchor='end'
        style={{
          dominantBaseline: 'middle',
          fill: 'gray',
        }}
      >
        {yd.ticks()[yd.ticks().length - 1]}
      </text>
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
            docId='fig3'
            width={width}
            height={height}
            margin={margin}
          >
            {xAxis}
            {yAxis}
            {data.map((d, k) => (
              <circle
                key={'datum-' + k}
                cx={x(d[xIndex])}
                cy={y(d[yIndex])}
                r={width/200}
                fill={colors(0)}
              />
            )).toArray()}
            {gap.get('sampleUniformData').map((d, k) => (
              <circle
                key={'uniform-datum-' + k}
                cx={x(d[xIndex])}
                cy={y(d[yIndex])}
                r={width/200}
                fill='black'
              />
            ))}
          </Svg>
        </Panel>
        <Caption
          docId='fig3'
          title='Figure 3:'
          text='original data and example Monte Carlo data'
        />
      </div>
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
            docId='fig4'
            width={width}
            height={height}
            margin={margin}
          >
            {xwAxis}
            {ywAxis}
            {Object.keys(gap.get('Wk')).map(k => (
              <circle
                key={'log-wk-' + k}
                cx={xw(k)}
                cy={yw(gap.get('Wk')[k])}
                r={width/100}
                fill='none'
                stroke={colors(0)}
              />
            ))}
            {Object.keys(gap.get('Wkb')).map(k => (
              <circle
                key={'log-wkb-' + k}
                cx={xw(k)}
                cy={yw(gap.get('Wkb')[k])}
                r={width/100}
                fill='none'
                stroke='black'
              />
            ))}
          </Svg>
        </Panel>
        <Caption
          docId='fig4'
          title='Figure 4:'
          text='log plot of sums of squares of variances of k-means clusters of original data and Monte Carlo data averages'
        />
      </div>
      <br/>
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
            docId='fig5'
            width={width}
            height={height}
            margin={margin}
          >
            {xgAxis}
            {ygAxis}
            {Object.keys(gap.get('gap')).map(k => (
              <circle
                key={'gap-' + k}
                cx={xw(k)}
                cy={yg(gap.get('gap')[k])}
                r={width/100}
                fill='none'
                stroke={colors(0)}
              />
            ))}
          </Svg>
        </Panel>
        <Caption
          docId='fig5'
          title='Figure 5:'
          text='gap'
        />
      </div>
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
            docId='fig6'
            width={width}
            height={height}
            margin={margin}
          >
            {xdAxis}
            {ydAxis}
            {Object.keys(gap.get('delta')).map(k => (
              <rect
                key={'delta-' + k}
                x={xw(k) - xw(0.5)}
                y={gap.get('delta')[k] > 0 ? yd(gap.get('delta')[k]) : yd(0)}
                width={xw(0.9) - xw(0)}
                height={Math.abs(yd(0) - yd(gap.get('delta')[k]))}
                fill={colors(0)}
              />
            ))}
          </Svg>
        </Panel>
        <Caption
          docId='fig6'
          title='Figure 6:'
          text='delta'
        />
      </div>
    </div>
  )
}
