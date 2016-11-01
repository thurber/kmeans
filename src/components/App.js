'use strict'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Map, List, fromJS } from 'immutable'
import reducers from '../reducers/index'
import Router from '../containers/Router'
import '../styles/index.scss'

export default  props => (
  <Provider store={createStore(
    reducers,
    undefined,
    (
      process.env.NODE_ENV !== 'production'
      &&
      typeof window !== 'undefined'
      &&
      window.devToolsExtension
    ) ? window.devToolsExtension() : undefined
  )}>
    <Router/>
  </Provider>
)
