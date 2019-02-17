import React, {Component} from 'react';

import {
	Link
} from 'react-router-dom';

import * as routes from '../constants/routes';

import '../styles/Header.css';

export class Header extends Component {
	constructor (props) {
		super(props);
		if (props.page === 'home') {
			this.state = {
				search: '',
				buttonText: 'Signup',
				className: 'signupButton',
				link: routes.SIGNUP
			}
		} else if (props.page === 'signup') {
			this.state = {
				search: '',
				buttonText: 'Login',
				className: 'loginButton',
				link: routes.LOGIN
			}
		} else if (props.page === 'login') {
			this.state = {
				search: '',
				buttonText: 'Signup',
				className: 'signupButton',
				link: routes.SIGNUP
			}
		} else if (props.page === 'complete') {
			this.state = {
				search: '',
				buttonText: 'Profile',
				className: 'profileButton',
				link: routes.PROFILE
			}
		} else if (props.page === 'profile') {
			this.state = {
				search: '',
				buttonText: 'Signout',
				className: 'signoutButton',
				link: routes.SIGNOUT
			}
		}
	}

	componentWillMount () {
		const uid = window.localStorage.getItem('uid');
		const email = window.localStorage.getItem('email');
		const displayName = window.localStorage.getItem('displayName');
		if (uid !== null && this.props.page !== 'profile') {
			console.log('here');
			if (email) {
				this.setState({
					buttonText: email
				})
			} else {
				this.setState({
					buttonText: displayName
				})
			}
		}
	}

	render () {
		const {
			search,
			buttonText,
			className,
			link
		} = this.state;

		const nonAuthHeader = (
			<div className='header'>
				<input
					className='searchField'
					value={search}
					type='text'
					onChange={event => this.setState({search: event.target.value})}
					placeholder='Search'
				/>
				<Link to={link} className={className} style={{textDecoration: 'none'}}>{buttonText}</Link>
			</div>
		)

		return nonAuthHeader;
	}

}