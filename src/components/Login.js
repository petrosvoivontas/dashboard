import React, {Component} from 'react';

import {AuthButtons} from './AuthButtons';
import {Header} from './Header';

import '../styles/Login.css';

export class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password:''
    }
  }

  render () {
    const {
        email,
        password
    } = this.state;
    return (
      <div className='loginPage'>
        <Header page='login'/>
        <div className='loginForm'>
            <input 
              className='email'
              type='email'
              value={email}
              onChange={event => this.setState({email: event.target.value})}
              placeholder='Email'
            />
            <input 
              className='password'
              type='password'
              value={password}
              onChange={event => this.setState({password: event.target.value})}
              placeholder='Password'
            />
            <AuthButtons page='login' email={email} password={password} />
        </div>
      </div>
    )
  }
}