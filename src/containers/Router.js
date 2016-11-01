import { connect } from 'react-redux'
import { List } from 'immutable'
import Router from '../components/Router'
import * as Actions from '../actions/index'

const mapStateToProps = (state, ownProps) => ({
  hasData: state.get('data', List()).count() > 0,
})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Router)

