import React, {Component} from 'react';

import {AuthButtons} from './AuthButtons';
import {Header} from './Header';

import '../styles/Signup.css';

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      passwordOne: '',
      passwordTwo: ''
    }
  }

  render () {
    const {
        email,
        passwordOne,
        passwordTwo
    } = this.state;

    return (
      <div className='signupPage'>
        <Header page='signup'/>
        <div className='signupForm'>
            <input 
              className='email'
              type='email'
              value={email}
              onChange={event => this.setState({email: event.target.value})}
              placeholder='Email'
            />
            <input 
              className='passwordOne'
              type='password'
              value={passwordOne}
              onChange={event => this.setState({passwordOne: event.target.value})}
              placeholder='Password'
            />
            <input 
              className='passwordTwo'
              type='password'
              value={passwordTwo}
              onChange={event => this.setState({passwordTwo: event.target.value})}
              placeholder='Confirm password'
            />
            <AuthButtons page='signup' email={email} passwordOne={passwordOne} passwordTwo={passwordTwo} />
        </div>
      </div>
    )
  }
}