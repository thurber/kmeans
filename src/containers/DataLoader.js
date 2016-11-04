import { connect } from 'react-redux'
import { List } from 'immutable'
import DataLoader from '../components/DataLoader'
import * as Actions from '../actions/index'
import getRandomUniform from '../methods/getRandomUniform'
import getRandomClusters from '../methods/getRandomClusters'

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getRandomData: () => {
    let N = getRandomUniform(500, 1000, true)
    let k = getRandomUniform(3, 9, true)
    let d = getRandomUniform(2, 5, true)
    let H = []
    for (let i = 0; i < d; i++) {
      H.push('abcdefghijklmnopqrstuvwxyz'[i])
    }
    dispatch(Actions.setHeaders(List(H)))
    dispatch(Actions.setData(List(getRandomClusters(N, k, d))))
  },
  loadData: (H, D) => {
    dispatch(Actions.setHeaders(List(H)))
    dispatch(Actions.setData(List(D)))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataLoader)

