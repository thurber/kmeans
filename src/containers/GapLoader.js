import { connect } from 'react-redux'
import { Map } from 'immutable'
import GapLoader from '../components/GapLoader'
import getGapStat from '../methods/getGapStat'
import * as Actions from '../actions/index'

const mapStateToProps = (state, ownProps) => ({
  data: state.get('data'),
  kMeans: state.get('kmeans'),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getGap: (D, kMeans) => {
    let gap = getGapStat(D.toJS(), kMeans.toJS(), kMeans.count())
    dispatch(Actions.setGap(Map(gap)))
    dispatch(Actions.setK(parseInt(gap.k)))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GapLoader)
