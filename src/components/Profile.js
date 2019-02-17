import React, {Component} from 'react';

import {Header} from './Header';

import {serverUrl, localUrl} from '../constants/config';

import '../styles/Profile.css';

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      name: '',
      city: '',
      profession: '',
      address: '',
      education: '',
      company: '',
      skills: '',
      gender: '',
      birthDate: '',
      maritalStatus: '',
      pinCode: '',
      profilePicture: ''
    }
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentWillMount () {
    const uid = window.localStorage.getItem('uid');
    if (uid !== null) {
      const buildUrl = `${serverUrl}/users/getUserDoc?uid=${uid}`;
      fetch(buildUrl)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Request failed');
        })
        .then(jsonResponse => {
          console.log(jsonResponse);
          if (jsonResponse.isComplete) {
            this.setState({
              name: jsonResponse.name,
              city: jsonResponse.city,
              profession: jsonResponse.profession,
              address: jsonResponse.address,
              education: jsonResponse.education,
              company: jsonResponse.company,
              skills: jsonResponse.skills,
              gender: jsonResponse.gender,
              birthDate: jsonResponse.birthDate,
              maritalStatus: jsonResponse.maritalStatus,
              pinCode: jsonResponse.pinCode,
              profilePicture: jsonResponse.profilePicture,
              loading: false
            })
          } else {
            window.location = `${localUrl}/complete`;
          }
        })
    } else {
      window.location = `${localUrl}/signup`;
    }
  }

  handleUpdate () {
    const {
      name,
      city,
      profession,
      address,
      education,
      company,
      skills,
      gender,
      birthDate,
      maritalStatus,
      pinCode,
      profilePicture,
      group
    } = this.state;

    const uid = window.localStorage.getItem('uid');
    const newFields = {
      uid: uid,
      name: name,
      city: city,
      profession: profession,
      address: address,
      education: education,
      company: company,
      skills: skills,
      gender: gender,
      birthDate: birthDate,
      maritalStatus: maritalStatus,
      pinCode: pinCode,
      profilePicture: profilePicture,
      group: group
    }

    const buildUrl = `${serverUrl}/users/updateProfile`;
    fetch(buildUrl, {
      method: 'POST',
      body: JSON.stringify(newFields),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed');
    }, networkError => console.log(networkError))
    .then(jsonResponse => {
      console.log(jsonResponse.message);
    })
  }

  render () {
    const {
      name,
      city,
      profession,
      address,
      education,
      company,
      skills,
      gender,
      birthDate,
      maritalStatus,
      pinCode,
      profilePicture,
      group
    } = this.state;

    const profilePage = (
      <div className='profilePage'>
      <Header page='profile'/>
          <input
              type='text'
              value={name}
              onChange={event => this.setState({name: event.target.value})}
          />
          <input
              type='text'
              value={city}
              onChange={event => this.setState({city: event.target.value})}
          />
          <input
              type='text'
              value={profession}
              onChange={event => this.setState({profession: event.target.value})}
          />
          <input
              type='text'
              value={address}
              onChange={event => this.setState({address: event.target.value})}
          />
          <input
              type='text'
              value={education}
              onChange={event => this.setState({education: event.target.value})}
          />
          <input
              type='text'
              value={company}
              onChange={event => this.setState({company: event.target.value})}
          />
          <input
              type='text'
              value={skills}
              onChange={event => this.setState({skills: event.target.value})}
          />
          <input
              type='text'
              value={gender}
              onChange={event => this.setState({gender: event.target.value})}
          />
          <input
              type='text'
              value={birthDate}
              onChange={event => this.setState({birthDate: event.target.value})}
          />
          <input
              type='text'
              value={maritalStatus}
              onChange={event => this.setState({maritalStatus: event.target.value})}
          />
          <input
              type='text'
              value={pinCode}
              onChange={event => this.setState({pinCode: event.target.value})}
          />
          <input
              type='text'
              value={profilePicture}
              onChange={event => this.setState({profilePicture: event.target.value})}
          />
          <input
              type='text'
              value={group}
              onChange={event => this.setState({group: event.target.value})}
          />
          <button onClick={this.handleUpdate}>Save</button>
      </div>
    )

    if (this.state.loading === false) {
      return profilePage;
    } else {
      return <div></div>;
    }
  }
}