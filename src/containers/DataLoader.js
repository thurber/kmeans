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
    let k = getRandomUniform(3, 6, true)
    dispatch(Actions.setData(List(getRandomClusters(N, k))))
    dispatch(Actions.setK(k))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataLoader)

