import React from 'react'
import * as d3 from 'd3'
import Svg from './Svg'
import Panel from 'muicss/lib/react/panel'
import Caption from './Caption'
import colors from '../styles/colors'

export default ({ data, kmeans, gap, width, height, margin }) => {
  
  width = width ? width : 200
  height = height ? height : 200
  margin = margin ? margin : 0

  let x = d3.scaleLinear().range([0, width]).domain([-1, 1])
  let y = d3.scaleLinear().range([height, 0]).domain([-1, 1])

  let xw = d3.scaleLinear().range([0, width]).domain([0, 10])
  let yw = d3.scaleLinear().range([height, 0]).domain([
    Math.floor(d3.min(Object.keys(gap.get('Wk')).map(k => gap.get('Wk')[k]))),
    Math.ceil(d3.max(Object.keys(gap.get('Wkb')).map(k => gap.get('Wkb')[k])))
  ])
  
  let yg = d3.scaleLinear().range([height, 0]).domain([
    Math.floor(d3.min(Object.keys(gap.get('gap')).map(k => gap.get('gap')[k]))),
    Math.ceil(d3.max(Object.keys(gap.get('gap')).map(k => gap.get('gap')[k])))
  ])

  let yd = d3.scaleLinear().range([height, 0]).domain([
    Math.floor(d3.min(Object.keys(gap.get('delta')).map(k => gap.get('delta')[k]))),
    Math.ceil(d3.max(Object.keys(gap.get('delta')).map(k => gap.get('delta')[k])))
  ])

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
            {data.map((d, k) => (
              <circle
                key={'datum-' + k}
                cx={x(d[0])}
                cy={y(d[1])}
                r={width/200}
                fill={colors(0)}
              />
            )).toArray()}
            {gap.get('sampleUniformData').map((d, k) => (
              <circle
                key={'uniform-datum-' + k}
                cx={x(d[0])}
                cy={y(d[1])}
                r={width/200}
                fill='black'
              />
            ))}
          </Svg>
        </Panel>
        <Caption
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
            width={width}
            height={height}
            margin={margin}
          >
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
            width={width}
            height={height}
            margin={margin}
          >
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
            width={width}
            height={height}
            margin={margin}
          >
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
          title='Figure 6:'
          text='delta'
        />
      </div>
    </div>
  )
}
