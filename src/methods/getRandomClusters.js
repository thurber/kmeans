import getRandomUniform from './getRandomUniform'
import getRandomNormal from './getRandomNormal'

export default ( N, k ) => {
  const n = N / k
  let X = [ ]
  for ( let i = 0 ; i < k ; i++ ) {
    let c = [ getRandomUniform( -1, 1 ), getRandomUniform( -1, 1 ) ]
    let s = getRandomUniform( 0.05, 0.5 )
    let x = [ ]
    while ( x.length < n ) {
      let a = getRandomNormal( c[0], s )
      let b = getRandomNormal( c[1], s )
      if ( Math.abs( a ) < 1 && Math.abs( b ) < 1 ) {
        x.push([ a, b ])
      }
    }
    X = X.concat( x )
  }
  return X.slice( 0, N )
}
