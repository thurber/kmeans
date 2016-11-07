import { Map, List } from 'immutable'
import * as Actions from '../actions/index'

let initialState = Map({
  headers: undefined,
  data: undefined,
  rawData: undefined,
  x: 0,
  y: 1,
  k: undefined,
  kmeans: undefined,
  gap: undefined,
  showClusterTable: false,
})

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_HEADERS:
      return state.set('headers', action.value)
    case Actions.SET_DATA:
      return state.set('kmeans', undefined).set('k', undefined).set('gap', undefined).set('x', 0).set('y', 1)
                  .set('rawData', action.value)
                  .set('data', action.value.filter(d => d.every(d => d)))
    case Actions.SET_K:
      return state.set('k', action.value)
    case Actions.SET_K_MEANS:
      return state.set('kmeans', action.value)
    case Actions.SET_GAP:
      return state.set('gap', action.value)
    case Actions.SET_X:
      return state.set('x', action.value)
    case Actions.SET_Y:
      return state.set('y', action.value)
    case Actions.SET_SHOW_CLUSTER_TABLE:
      return state.set('showClusterTable', action.value)
    default:
      return state
  }
}
