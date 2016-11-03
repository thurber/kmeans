import { Map, List } from 'immutable'
import * as Actions from '../actions/index'

let initialState = Map({
  data: undefined,
  k: undefined,
  kmeans: undefined,
  gap: undefined,
})

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_DATA:
      return state.set('data', action.value).set('kmeans', undefined).set('k', undefined).set('gap', undefined)
    case Actions.SET_K:
      return state.set('k', action.value)
    case Actions.SET_K_MEANS:
      return state.set('kmeans', action.value)
    case Actions.SET_GAP:
      return state.set('gap', action.value)
    default:
      return state
  }
}
