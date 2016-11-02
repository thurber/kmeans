import getRandomUniform from './getRandomUniform'
import { min } from 'd3'

let findCenters = ( data, k ) => {
  let clusters = [ ]
  let oldC = [ ]
  for ( let i = 0 ; i < k ; i++ ) {
    oldC.push( data[ getRandomUniform( 0, data.length, true ) ] )
  }
  let C = getInitialCenters( data, k )
  while ( ! hasConverged( oldC, C ) ) {
    oldC = C
    clusters = clusterPoints( data, C )
    C = getCenters( data, clusters, k , C )
  }
  return {
    clusters: clusters,
    centers: C,
    Wk: getWk( data, clusters, C ),
  }
}

let getWk = ( data, clusters, centers ) => {
  let k = centers.length
  let Wk = 0
  for ( let i = 0 ; i < k ; i++ ) {
    let count = 0
    let sum = 0
    for ( let j = 0 ; j < clusters.length ; j++ ) {
      if ( clusters[j] === i ) {
        count++
        sum += Math.pow( getNorm( data[j], centers[i] ), 2 )
      }
    }
    Wk += sum / ( 2 * count )
  }
  return Wk
}

let hasConverged = ( A, B, threshold = 1e-5 ) => {
  let err = 0
  for ( let i = 0 ; i < A.length ; i++ ) {
    err += getNorm( A[i], B[i] )
  }
  return ( err / A.length ) <= threshold
}

let clusterPoints = ( data, C ) => {
  let clusters = [ ]
  for ( let i = 0 ; i < data.length ; i++ ) {
    let d = [ ]
    for ( let j = 0 ; j < C.length ; j++ ) {
      d.push( getNorm( data[i], C[j] ) )
    }
    clusters.push( d.indexOf( min( d ) ) )
  }
  return clusters
}

let getCenters = ( data, clusters, k , centers ) => {
  let C = [ ]
  for ( let i = 0 ; i < k ; i++ ) {
    let centroid = [ ]
    let count = 0
    for ( let j = 0 ; j < clusters.length ; j++ ) {
      if ( clusters[j] === i ) {
        count++
        for ( let l = 0 ; l < data[j].length ; l++ ) {
          centroid[l] = ( centroid[l] || 0 ) + data[j][l]
        }
      }
    }
    for ( let j = 0 ; j < centroid.length ; j++ ) {
      centroid[j] = centroid[j] / count
    }
    if ( centroid.length === 0 ) {
      C.push( centers[i] )
    }
    else {
      C.push( centroid )
    }
  }
  return C
}

// use kmeans++ to initialize centers
let getInitialCenters = ( data, k ) => {
  // choose a random starting point
  let C = [ data[ getRandomUniform( 0, data.length, true ) ] ]
  while ( C.length < k ) {
    let D2 = getDistanceFromCenters( data, C )
    let sum = D2.reduce( ( a, b ) => a + b, 0 )
    let prob = D2.map( d => d / sum )
    let cuProb = [ ]
    prob.reduce( ( a, b, i ) => cuProb[i] = a + b, 0 )
    let r = Math.random()
    C.push( data[ cuProb.findIndex( p => p >= r ) ] )
  }
  return C
}

let getDistanceFromCenters = ( data, C ) => {
  let D2 = [ ]
  for ( let i = 0 ; i < data.length ; i++ ) {
    let M = [ ]
    for ( let j = 0 ; j < C.length ; j++ ) {
      M.push( Math.pow( getNorm( data[i], C[j] ), 2 ) )
    }
    D2.push( min( M ) )
  }
  return D2
}

let getNorm = ( A, B ) => {
  let sum = 0
  for ( let i = 0 ; i < A.length ; i++ ) {
    sum += Math.pow( A[i] - B[i] , 2 )
  }
  return Math.sqrt( sum )
}

export default findCenters
