import getRandomUniform from './getRandomUniform'
import getRandomNormal from './getRandomNormal'

export default ( N, k, d = 2 ) => {
  const n = N / k
  let X = [ ]
  for ( let i = 0 ; i < k ; i++ ) {
    let c = [ ]
    for ( let j = 0 ; j < d ; j++ ) {
      c.push( getRandomUniform( -1, 1 ) )
    }
    let s = getRandomUniform( 0.05, 0.5 )
    let x = [ ]
    while ( x.length < n ) {
      let p = [ ]
      for ( let j = 0 ; j < d ; j++ ) {
        let a = getRandomNormal( c[j], s )
        while ( Math.abs( a ) >= 1) {
          a = getRandomNormal( c[j], s )
        }
        p.push( a )
      }
      x.push( p )
    }
    X = X.concat( x )
  }
  return X.slice( 0, N )
}
