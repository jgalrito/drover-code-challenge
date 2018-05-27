import React, { Component } from 'react'
import thunk from 'redux-thunk'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'

import SearchForm from './vehicle/SearchForm'
import vehicle from './vehicle/reducer'

const store = createStore(combineReducers({
  vehicle
}), applyMiddleware(thunk))

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SearchForm/>
      </Provider>
    );
  }
}

export default App
