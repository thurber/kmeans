import React from 'react'
import DataLoader from '../containers/DataLoader'
import DataVis from '../containers/DataVis'
import ElbowLoader from '../containers/ElbowLoader'
import ElbowVis from '../containers/ElbowVis'
import GapLoader from '../containers/GapLoader'
import GapVis from '../containers/GapVis'
import KMeansLoader from '../components/KMeansLoader'
import KMeansVis from '../containers/KMeansVis'

export default ({ hasData, hasKMeans, hasGap }) => {
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
  if (!hasGap) {
    return (
      <div>
        <DataLoader/>
        <DataVis/>
        <ElbowLoader/>
        <ElbowVis/>
        <GapLoader/>
      </div>
    )
  }
  return (
    <div>
      <DataLoader/>
      <DataVis/>
      <ElbowLoader/>
      <ElbowVis/>
      <GapLoader/>
      <GapVis/>
      <KMeansLoader/>
      <KMeansVis/>
    </div>
  )
}
