import { connect } from 'react-redux'
import { Map } from 'immutable'
import ElbowLoader from '../components/ElbowLoader'
import getKMeans from '../methods/getKMeans'
import * as Actions from '../actions/index'

const mapStateToProps = (state, ownProps) => ({
  data: state.get('data'),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getElbow: (D) => {
    if (D.count() < 10) {
      window.alert('Not enough data!')
      return
    }
    let kMeans = {}
    for (let k = 1; k < 10; k++) {
      kMeans[k] = Map(getKMeans(D.toArray(), k))
    }
    dispatch(Actions.setKMeans(Map(kMeans)))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ElbowLoader)

