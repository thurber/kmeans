import React from 'react'
import Button from 'muicss/lib/react/button'
import Header from './Header'

export default props => (
  <div>
    <Header title='K-Means'/>
    <Button
      variant='raised'
      color='primary'
      size='small'
      onClick={() => {
        props.getKMeans(props.data, props.k)
      }}
    >
      Generate
    </Button>
  </div>
)
