import React from 'react'
import Button from 'muicss/lib/react/button'
import Header from './Header'

export default props => (
  <div>
    <Header title='Elbow Method'/>
    <Button
      variant='raised'
      color='primary'
      size='small'
      onClick={() => {
        props.getElbow(props.data)
      }}
    >
      Generate
    </Button>
  </div>
)
