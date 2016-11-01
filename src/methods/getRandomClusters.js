import getRandomUniform from './getRandomUniform'
import getRandomNormal from './getRandomNormal'

export default ( N, k ) => {
  console.log(N, k)
  const n = N / k
  let X = [ ]
  for ( let i = 0 ; i < k ; i++ ) {
    let c = { x: getRandomUniform( -1, 1 ), y: getRandomUniform( -1, 1 ) }
    console.log(c)
    let s = getRandomUniform( 0.05, 0.5 )
    let x = [ ]
    while ( x.length < n ) {
      let a = getRandomNormal( c.x, s )
      let b = getRandomNormal( c.y, s )
      if ( Math.abs( a ) < 1 && Math.abs( b ) < 1 ) {
        x.push({ x: a, y: b })
      }
    }
    X = X.concat( x )
  }
  return X.slice( 0, N )
}
