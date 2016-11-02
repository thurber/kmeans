import { connect } from 'react-redux'
import { Map } from 'immutable'
import KMeansLoader from '../components/KMeansLoader'
import getRandomUniform from '../methods/getRandomUniform'
import getKMeans from '../methods/getKMeans'
import * as Actions from '../actions/index'

const mapStateToProps = (state, ownProps) => ({
  data: state.get('data'),
  k: state.get('k'),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getKMeans: (D, k) => {
    dispatch(Actions.setKMeans(Map(getKMeans(D.toArray(), k))))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KMeansLoader)

