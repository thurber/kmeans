import { connect } from 'react-redux'
import KMeansVis from '../components/KMeansVis'
import * as Actions from '../actions/index'

const mapStateToProps = (state, ownProps) => ({
  data: state.get('data'),
  kmeans: state.get('kmeans').get(String(state.get('k'))),
  xIndex: state.get('x'),
  yIndex: state.get('y'),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KMeansVis)

