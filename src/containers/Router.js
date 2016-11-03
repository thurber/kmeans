import { connect } from 'react-redux'
import { List } from 'immutable'
import Router from '../components/Router'
import * as Actions from '../actions/index'

const mapStateToProps = (state, ownProps) => ({
  hasData: state.get('data') ? true : false,
  hasKMeans: state.get('kmeans') ? true : false,
  hasGap: state.get('gap') ? true : false,
  hasK: state.get('k') ? true : false,
})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Router)

