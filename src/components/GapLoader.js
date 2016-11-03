import React from 'react'
import Button from 'muicss/lib/react/button'
import Header from './Header'

export default props => (
  <div>
    <Header title='Gap Statistic'/>
    <Button
      variant='raised'
      color='primary'
      size='small'
      onClick={() => {
        props.getGap(props.data, props.kMeans)
      }}
    >
      Generate
    </Button>
  </div>
)
