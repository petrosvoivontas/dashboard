import React, {Component} from 'react';
import queryString from 'query-string';
import {serverUrl, localUrl} from '../constants/config';

export class Verification extends Component {
  componentDidMount () {
    const queries = queryString.parse(this.props.location.search);
    const uid = queries.uid;
    this.setState({
      uid: uid
    })
  }

  componentDidUpdate () {
    const isVerified = window.localStorage.getItem('isVerified');
    const uid = this.state.uid;
    
    if (isVerified === 'false') {
      if (uid !== '') {
        const requestUrl = `${serverUrl}/users/verify?uid=${uid}`;
        fetch(requestUrl)
          .then(response => {
            if (response.ok) {
              return response;
            } else {
              throw new Error('Request failed');
            }
          }, networkError => console.log(networkError))
          .then(secondResponse => {
            console.log(secondResponse.message);
            window.localStorage.setItem('isVerified', true);
            window.location = `${localUrl}/complete`;
          })
      }
    } else {
      window.location = `${localUrl}/complete`;
    }
  }

  render () {
    return <div></div>
  }
}