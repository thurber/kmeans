import React from 'react'
import DataLoader from '../containers/DataLoader'
import DataVis from '../containers/DataVis'
import ElbowLoader from '../containers/ElbowLoader'
import ElbowVis from '../containers/ElbowVis'
import KMeansVis from '../containers/KMeansVis'

export default ({ hasData, hasKMeans }) => {
  if (!hasData) {
    return <DataLoader/>
  }
  if (!hasKMeans) {
    return (
      <div>
        <DataLoader/>
        <DataVis/>
        <ElbowLoader/>
      </div>
    )
  }
  return (
    <div>
      <DataLoader/>
      <DataVis/>
      <ElbowLoader/>
      <ElbowVis/>
      <KMeansVis/>
    </div>
  )
}
