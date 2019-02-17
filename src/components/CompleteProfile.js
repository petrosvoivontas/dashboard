import React, {Component} from 'react';
import {serverUrl, localUrl} from '../constants/config';

import {Header} from './Header';

import '../styles/CompleteProfile.css';

export class CompleteProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
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
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    componentDidMount () {
        const uid = window.localStorage.getItem('uid');
        this.setState({
            uid: uid
        })
    }

    handleButtonClick () {
        const {
            uid,
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

        const requestUrl = `${serverUrl}/users/completeProfile`;
        fetch(requestUrl, {
            method: 'POST',
            body: JSON.stringify(newFields),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Request failed');
            }
        }, networkError => console.log(networkError))
        .then(jsonResponse => {
            console.log(jsonResponse.message);
            window.location = `${localUrl}/profile`;
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
        return (
            <div className='completeProfileForm'>
            <Header page='complete'/>
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
                <button onClick={this.handleButtonClick}>Complete Profile</button>
            </div>
        )
    }
}