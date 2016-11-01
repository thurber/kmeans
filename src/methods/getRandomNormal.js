// Marsaglia polar method
// note that the bonus value is tossed
export default ( mean, std ) => {
  let x1, x2, w
  do {
    x1 = 2.0 * Math.random() - 1.0
    x2 = 2.0 * Math.random() - 1.0
    w = x1 * x1 + x2 * x2
  } while ( w >= 1.0 )
  w = Math.sqrt(( -2.0 * Math.log( w )) / w )
  return mean + std * x1 * w
}
