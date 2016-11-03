import { min, max } from 'd3'
import getRandomUniform from './getRandomUniform'
import getKMeans from './getKMeans'

let getBounds = ( data ) => {
  if ( data.length < 1 ) {
    return undefined
  }
  let minMax = [ [ ], [ ] ]
  for ( let i = 0 ; i < data[0].length ; i++ ) {
    minMax[0][i] = min( data, d => d[i] )
    minMax[1][i] = max( data, d => d[i] )
  }
  return minMax
}

let getUniformData = ( N, bounds ) => {
  let D = [ ]
  for ( let i = 0 ; i < N ; i++ ) {
    let d = [ ]
    for ( let j = 0 ; j < bounds[0].length ; j++ ) {
      d.push( getRandomUniform( bounds[0][j], bounds[1][j] ) )
    }
    D.push( d )
  }
  return D
}

let getUniformKMeans = ( data, B, kMax ) => {
  let bounds = getBounds( data )
  let uniformKMeans = { }
  let uniformData = [ ]
  for ( let i = 0 ; i < B ; i++ ) {
    uniformData = getUniformData( data.length, bounds )
    for ( let j = 1 ; j <= kMax ; j++ ) {
      if ( ! uniformKMeans[j] ) {
        uniformKMeans[j] = [ ]
      }
      uniformKMeans[j].push( getKMeans( uniformData, j ) )
    }
  }
  uniformKMeans['sampleData'] = uniformData
  return uniformKMeans
}

let getGapStat = ( data, kMeans, kMax, B = 10 ) => {
  let uniformKMeans = getUniformKMeans( data, B, kMax )
  let Wk = { }
  let Wkb = { }
  let sk = { }
  let gap = { }
  let delta = { }
  for ( let i = 1 ; i <= kMax ; i++ ) {
    Wk[i] = Math.log( kMeans[i].Wk )
    Wkb[i] = uniformKMeans[i].reduce( ( a, b ) => a + Math.log( b.Wk ), 0 ) / B
    sk[i] = Math.sqrt( uniformKMeans[i].reduce( (a, b) => a + Math.pow( Math.log( b.Wk ) - Wkb[i], 2 ), 0 ) / B )
    gap[i] = Wkb[i] - Wk[i]
    if ( i > 1 ) {
      delta[(i-1)] = gap[(i-1)] - gap[i] + sk[i]
    }
  }
  return {
    Wk: Wk,
    Wkb: Wkb,
    sk: sk,
    gap: gap,
    delta: delta,
    sampleUniformData: uniformKMeans.sampleData,
    uniformKMeans: uniformKMeans,
    k: Object.keys(delta).reduce( (a, b ) => a ? a : ( delta[b] > 0 ? b : a ), undefined ),
  }
}

export default getGapStat
