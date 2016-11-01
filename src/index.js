'use strict'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './components/App'

(() => {

  window.addEventListener('load', function load(event) {
    
    window.removeEventListener('load', load, false)

    render(
      <div
        style={{
          boxSizing: 'border-box',
          width: '100%',
          minWidth: '300px',
          maxWidth: '800px',
          margin: '0 auto',
          padding: '10px',
        }}
      >
        <AppContainer>
          <App/>
        </AppContainer>
      </div>,
      document.getElementById('mount')
    )

    if (module.hot) {
      module.hot.accept('./components/App', () => {
        const NextApp = require('./components/App').default
        render(
          <div
            style={{
              boxSizing: 'border-box',
              width: '100%',
              minWidth: '300px',
              maxWidth: '800px',
              margin: '0 auto',
              padding: '10px',
            }}
          >
            <AppContainer>
              <App/>
            </AppContainer>
          </div>,
          document.getElementById('mount')
        )
      })
    }

  })

})()
