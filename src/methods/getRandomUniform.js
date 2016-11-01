export default (min, max, integer) => {
  let r = Math.random() * (max - min) + min
  if (integer) {
    return Math.floor(r)
  }
  return r
}
