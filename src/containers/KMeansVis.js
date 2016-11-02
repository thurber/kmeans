import { connect } from 'react-redux'
import KMeansVis from '../components/KMeansVis'
import * as Actions from '../actions/index'

const mapStateToProps = (state, ownProps) => ({
  data: state.get('data'),
  kmeans: state.get('kmeans'),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KMeansVis)

