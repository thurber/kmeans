import React from 'react'
import Button from 'muicss/lib/react/button'
import Header from './Header'

export default props => (
  <div>
    <Header title='Import Data'/>
    <Button
      variant='raised'
      color='primary'
      size='small'
      disabled={true}
    >
      Load JSON
    </Button>
    <Button
      variant='raised'
      color='primary'
      size='small'
      onClick={() => {
        props.getRandomData()
      }}
    >
      Randomize
    </Button>
  </div>
)
