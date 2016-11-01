import { Map, List } from 'immutable'
import * as Actions from '../actions/index'

let initialState = Map({
  data: List(),
})

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_DATA:
      return state.set('data', action.value)
    default:
      return state
  }
}
