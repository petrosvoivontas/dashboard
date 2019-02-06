import $ from 'jquery';
import React, { Component } from 'react';
import './App.css';
const {emailSignup, emailLogin, googleSignup, facebookSignup, getFacebookResult} = require('./firebase/auth');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password:''
    }
    this.handleEmailSignup = this.handleEmailSignup.bind(this);
    this.handleEmailLogin = this.handleEmailLogin.bind(this);
  }

  handleEmailSignup () {
    const {email, password} = this.state;
    emailSignup(email, password);
  }

  handleEmailLogin () {
    const {email, password} = this.state;
    emailLogin(email, password);
  }

  handleGoogleSignup () {
    const google = googleSignup();
    console.log(google.token);
  }

  handleFacebookSignup () {
    facebookSignup()
      .then(result => {
        console.log(result.token);
      })
  }

  render() {
    return (
      <div>
        <input 
          className='email'
          type='text'
          value={this.state.email}
          onChange={event => this.setState({email: event.target.value})}>
        </input>
        <input
          className='password'
          type='password'
          value={this.state.password}
          onChange={event => this.setState({password: event.target.value})}>
        </input>
        <button onClick={this.handleEmailSignup}>Sign up</button>
        <button onClick={this.handleEmailLogin}>Log in</button>
        <button onClick={this.handleGoogleSignup}>Google</button>
        <button onClick={this.handleFacebookSignup}>Facebook</button>
        <p className='result'></p>
      </div>
    )
  }
}

export default App;
