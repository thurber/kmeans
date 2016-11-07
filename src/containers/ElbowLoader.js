import { connect } from 'react-redux'
import { Map } from 'immutable'
import { scan } from 'd3'
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
    // run kmeans for k between 1 and 10
    for (let k = 1; k < 10; k++) {
      // choose the best run for each k out of 5 tries
      let iter = []
      for (let i = 0; i < 5; i++) {
        iter[i] = getKMeans(D.toArray(), k)
      }
      kMeans[k] = Map(iter[scan(iter, (a, b) => a.Wk - b.Wk)])
    }
    dispatch(Actions.setKMeans(Map(kMeans)))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ElbowLoader)

