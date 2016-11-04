import { connect } from 'react-redux'
import DataVis from '../components/DataVis'
import * as Actions from '../actions/index'

const mapStateToProps = (state, ownProps) => ({
  data: state.get('data'),
  xIndex: state.get('x'),
  yIndex: state.get('y'),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataVis)

