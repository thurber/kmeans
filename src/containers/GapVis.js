import { connect } from 'react-redux'
import GapVis from '../components/GapVis'
import * as Actions from '../actions/index'

const mapStateToProps = (state, ownProps) => ({
  data: state.get('data'),
  kmeans: state.get('kmeans'),
  gap: state.get('gap'),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GapVis)

