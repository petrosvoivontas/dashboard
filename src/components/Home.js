import React, { Component } from 'react';

import {Header} from './Header';

export class Home extends Component {
  render() {
    return (
      <div>
        <Header page='home'/>
        <p>Home page</p>
      </div>
    )
  }
}
