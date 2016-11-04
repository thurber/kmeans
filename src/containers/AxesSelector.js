import { connect } from 'react-redux'
import AxesSelector from '../components/AxesSelector'
import * as Actions from '../actions/index'

const mapStateToProps = (state, ownProps) => ({
  headers: state.get('headers'),
  xIndex: state.get('x'),
  yIndex: state.get('y'),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setX: (x) => {
    dispatch(Actions.setX(x))
  },
  setY: (y) => {
    dispatch(Actions.setY(y))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AxesSelector)
