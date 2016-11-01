import React from 'react'
import Button from 'muicss/lib/react/button'
import Divider from 'muicss/lib/react/divider'

export default props => (
  <div>
    <div
      className='mui--text-title'
    >
      Import Data
    </div>
    <Divider
      style={{
        marginBottom: '10px',
      }}
    />
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
