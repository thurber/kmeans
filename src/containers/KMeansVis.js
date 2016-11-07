import { connect } from 'react-redux'
import KMeansVis from '../components/KMeansVis'
import * as Actions from '../actions/index'

const mapStateToProps = (state, ownProps) => {
  let rawData = state.get('rawData')
  let kmeans = state.get('kmeans').get(String(state.get('k')))
  let i = 0
  let clusterData = rawData.map(d => {
    if (d.every(d => d)) {
      i++
      return kmeans.get('clusters')[i-1]
    }
    return undefined
  }).toArray()
  return {
    rawData: rawData,
    data: state.get('data'),
    clusterData: clusterData,
    kmeans: kmeans,
    xIndex: state.get('x'),
    yIndex: state.get('y'),
    showClusterTable: state.get('showClusterTable'),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  setShowClusterTable: (b) => {
    dispatch(Actions.setShowClusterTable(b))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KMeansVis)

