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
    dispatch(Actions.setData(List(getRandomClusters(
      getRandomUniform(500, 1000, true),
      getRandomUniform(3, 6, true)
    ))))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataLoader)

