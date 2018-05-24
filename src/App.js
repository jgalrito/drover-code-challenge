import React, { Component } from 'react';

import SearchForm from './vehicle/SearchForm';

class App extends Component {
  render() {
    return (
      <div className="container py-3">
        <SearchForm/>
      </div>
    );
  }
}

export default App;
