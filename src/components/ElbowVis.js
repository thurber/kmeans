import React from 'react'
import * as d3 from 'd3'
import Svg from './Svg'
import Panel from 'muicss/lib/react/panel'
import Caption from './Caption'

export default ({ kmeans, width, height, margin }) => {
  
  width = width ? width : 200
  height = height ? height : 200
  margin = margin ? margin : 0

  let x = d3.scaleLinear().range([0, width]).domain([0, 11])
  let y = d3.scaleLinear().range([height, 0]).domain([0, 1])

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
          {kmeans.map((d, k) => (
            <circle
              key={'Wk-' + k}
              cx={x(k)}
              cy={y(d.get('Wk'))}
              r={width/100}
              fill='none'
              stroke='black'
            />
          )).toArray()}
        </Svg>
      </Panel>
      <Caption
        title='Figure 2:'
        text='elbow chart'
      />
    </div>
  )
}