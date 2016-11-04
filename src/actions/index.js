export const SET_HEADERS = 'SET_HEADERS'
export const setHeaders = ( H ) => ({
  type: SET_HEADERS,
  value: H,
})

export const SET_DATA = 'SET_DATA'
export const setData = ( D ) => ({
  type: SET_DATA,
  value: D,
})

export const SET_X = 'SET_X'
export const setX = ( i ) => ({
  type: SET_X,
  value: i,
})

export const SET_Y = 'SET_Y'
export const setY = ( i ) => ({
  type: SET_Y,
  value: i,
})

export const SET_K = 'SET_K'
export const setK = ( k ) => ({
  type: SET_K,
  value: k,
})

export const SET_K_MEANS = 'SET_K_MEANS'
export const setKMeans = ( K ) => ({
  type: SET_K_MEANS,
  value: K,
})

export const SET_GAP = 'SET_GAP'
export const setGap = ( G ) => ({
  type: SET_GAP,
  value: G,
})
