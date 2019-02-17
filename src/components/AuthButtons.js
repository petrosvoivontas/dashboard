import React, {Component} from 'react';

import googleIcon from '../google-icon.png';
import facebookIcon from '../facebook-icon.png';

import { serverUrl, localUrl } from '../constants/config';
import '../styles/AuthButtons.css';

import $ from 'jquery';

const {
  emailSignup,
  emailLogin,
  facebookSignup,
  googleSignup
} = require('../firebase/auth');

export class AuthButtons extends Component {
  constructor(props) {
    super(props);
    if (props.page === 'signup') {
      this.state = {
        className: 'signupButton',
        buttonText: 'Signup',
        email: '',
        passwordOne: '',
        passwordTwo: ''
      }
    } else {
      this.state = {
        className: 'loginButton',
        buttonText: 'Login',
        email: '',
        password: ''
      }
    }
    this.handleEmailSignup = this.handleEmailSignup.bind(this);
    this.handleEmailLogin = this.handleEmailLogin.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== null) {
      if (nextProps.page === 'signup') {
        this.setState({
          className: 'signupButton',
          buttonText: 'Signup',
          email: nextProps.email,
          passwordOne: nextProps.passwordOne,
          passwordTwo: nextProps.passwordTwo
        })
      } else if (nextProps.page === 'login') {
        this.setState({
          className: 'loginButton',
          buttonText: 'Login',
          email: nextProps.email,
          password: nextProps.password
        })
      }
    }
  }

  handleEmailSignup () {
      const {
        email,
        passwordOne,
        passwordTwo
      } = this.state;
      if (passwordOne === passwordTwo) {
        emailSignup(email, passwordOne)
          .then(userCredential => {
            const user = userCredential.user;
            const email = user.email;
            const uid = user.uid;
            window.localStorage.setItem('email', email);
            window.localStorage.setItem('uid', uid);
            window.localStorage.setItem('isVerified', false);
          })
      }
  }

  handleEmailLogin () {
    const {
      email,
      password
    } = this.state;
    emailLogin(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        const email = user.email;
        const uid = user.uid;
        window.localStorage.setItem('email', email);
        window.localStorage.setItem('uid', uid);
        const buildUrl = `${serverUrl}/users/getUserDoc?uid=${uid}`;
        $.ajax({
          url: buildUrl,
          type: 'GET',
          dataType: 'json',
          success (response) {
            console.log('This is the response after logging in', response)
            if (response.isVerified) {
              window.localStorage.setItem('isVerified', true);
            }
            window.location = `${localUrl}/profile`;
          },
          error (jqXHR, status, errorThrown) {
            console.log(errorThrown);
          }
        })
      })
  }

  handleFacebookSignup () {
    facebookSignup()
      .then(userCredential => {
        const user = userCredential.user;
        const displayName = user.displayName;
        const uid = user.uid;
        window.localStorage.clear();
        window.localStorage.setItem('uid', uid);
        window.localStorage.setItem('displayName', displayName);
        window.localStorage.setItem('signedUp', false)
        window.localStorage.setItem('isComplete', false);
        window.location = `${localUrl}/complete`;
      })
  }

  handleGoogleSignup () {
    googleSignup()
      .then(userCredential => {
        const user = userCredential.user;
        const displayName = user.displayName;
        const uid = user.uid;
        window.localStorage.clear();
        window.localStorage.setItem('uid', uid);
        window.localStorage.setItem('displayName', displayName);
        window.localStorage.setItem('signedUp', false)
        window.localStorage.setItem('isComplete', false);
        window.location = `${localUrl}/complete`;
      })
  }

  render() {
    if (this.props.page === 'signup') {
      const {
        email,
        passwordOne,
        passwordTwo
      } = this.state;
      const isDisabled = email === '' || passwordOne === '' || passwordTwo === '';
      return (
        <div className='authButtons'>
          <div className='authIcons'>
            <img className='facebookAuth' src={facebookIcon} onClick={this.handleFacebookSignup} alt='facebook_logo'/>
            <img className='googleAuth' src={googleIcon} onClick={this.handleGoogleSignup} alt='google_logo'/>
          </div>
          <button className={this.state.className} disabled={isDisabled} onClick={this.handleEmailSignup}>{this.state.buttonText}</button>
        </div>
      )
    } else {
      const {
        email,
        password
      } = this.state;
      const isDisabled = email === '' || password === '';
      return (
        <div className='authButtons'>
          <div className='authIcons'>
            <img className='facebookAuth' src={facebookIcon} onClick={this.handleFacebookSignup} alt='facebook_logo'/>
            <img className='googleAuth' src={googleIcon} onClick={this.handleGoogleSignup} alt='google_logo'/>
          </div>
          <button className={this.state.className} disabled={isDisabled} onClick={this.handleEmailLogin}>{this.state.buttonText}</button>
        </div>
      )
    }
  }
}