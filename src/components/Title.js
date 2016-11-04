import React from 'react'

export default () => (
  <div>
    <div
      className='mui--text-display1'
      style={{
        fontVariant: 'small-caps',
      }}
    >
      kMeans++
    </div>
    <div
      className='mui--text-subhead'
      style={{
        marginTop: '0.167em'
      }}
    >
      Run a <i>k-means</i> statistical simulation on your data to determine clustering characteristics.
    </div>
    <div
      className='mui--text-body1'
      style={{
        margin: '0.667em 0'
      }}
    >
      Calculations and visualizations closely follow the discussion presented <a target='_blank' href='https://datasciencelab.wordpress.com/2013/12/27/finding-the-k-in-k-means-clustering/'>here</a>.
      <br/>
      For best results, data should be normalized into a vector space with each dimension ∈ [ 0, 1 ] or [ -1, 1 ].
      <br/>
      Data outside of this range will not be displayed in the visualizations.
      <br/>
      The first row of the CSV is assumed to be header data.
    </div>
  </div>
)
