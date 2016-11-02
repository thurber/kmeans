import React from 'react'
import DataLoader from '../containers/DataLoader'
import DataVis from '../containers/DataVis'
import KMeansLoader from '../containers/KMeansLoader'
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
        <KMeansLoader/>
      </div>
    )
  }
  return (
    <div>
      <DataLoader/>
      <DataVis/>
      <KMeansLoader/>
      <KMeansVis/>
    </div>
  )
}
