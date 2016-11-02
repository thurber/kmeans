import { connect } from 'react-redux'
import ElbowVis from '../components/ElbowVis'
import * as Actions from '../actions/index'

const mapStateToProps = (state, ownProps) => ({
  kmeans: state.get('kmeans'),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ElbowVis)

