import {url} from './config';
import React, { Component } from 'react';
import './App.css';
const {emailSignup, emailLogin, googleSignup, facebookSignup} = require('./firebase/auth');

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
    emailLogin(email, password)
      .then(userCredential => {
        const uid = userCredential.user.uid;
        const provider = userCredential.user.providerData[0].providerId || userCredential.user.providerId;
        console.log('This is the provider', provider);
        console.log('This is the uid', uid);

        const buildUrl = `${url}/users/emailSignup?email=${email}&password=${password}&uid=${uid}&provider=${provider}`;
        fetch(buildUrl)
          .then(result => {
            if (result.ok) {
              return result.json();
            } else {
              throw new Error('Request failed.');
            }
          }, networkError => console.log(networkError));
      })
      .then(jsonResponse => {
        console.log(jsonResponse);
      })
  }

  handleGoogleSignup () {
    googleSignup();
  }

  handleFacebookSignup () {
    facebookSignup();
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
