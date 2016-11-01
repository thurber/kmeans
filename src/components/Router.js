import React from 'react'
import DataLoader from '../containers/DataLoader'
import DataVis from '../containers/DataVis'

export default ({ hasData }) => {
  if (!hasData) {
    return <DataLoader/>
  }
  return (
    <div>
      <DataLoader/>
      <DataVis/>
    </div>
  )
}
