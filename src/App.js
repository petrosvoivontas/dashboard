import $ from 'jquery';
import React, { Component } from 'react';
import './App.css';
const {url} = require('./config');
const {googleSignup} = require('./firebase/auth');

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
    const email = this.state.email;
    const password = this.state.password;
    const responseDisplay = $('.response');
    fetch(`${url}/users/signup?email=${email}&password=${password}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed');
      }, networkError => console.log(networkError))
      .then(jsonResponse => {
        responseDisplay.text(jsonResponse);
      })
  }

  handleEmailLogin () {
    const email = this.state.email;
    const password = this.state.password;
    const responseDisplay = $('.response');
    fetch(`${url}/users/login?email=${email}&password=${password}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request faild.');
      }, networkError => console.log(networkError))
      .then(jsonResponse => {
        responseDisplay.text(jsonResponse);
      })
  }

  handleGoogleSignup () {
    googleSignup();
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
          type='text'
          value={this.state.password}
          onChange={event => this.setState({password: event.target.value})}>
        </input>
        <button onClick={this.handleEmailSignup}>Sign up</button>
        <button onClick={this.handleEmailLogin}>Log in</button>
        <button onClick={this.handleGoogleSignup}>Google</button>
        <p className='response'></p>
      </div>
    )
  }
}

export default App;
