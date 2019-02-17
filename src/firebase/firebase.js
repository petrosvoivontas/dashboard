const {localUrl, serverUrl} = require('../constants/config');
const firebase = require('firebase');

// Initialize Firebase
const config = {
    apiKey: "AIzaSyAVc3qH8zxYsTJH_z1lolHMHoeP81oxc8c",
    authDomain: "nuntium-d230a.firebaseapp.com",
    databaseURL: "https://nuntium-d230a.firebaseio.com",
    projectId: "nuntium-d230a",
    storageBucket: "nuntium-d230a.appspot.com",
    messagingSenderId: "888405293772"
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log(user);
        const displayName = user.displayName;
        const email = user.email;
        const uid = user.uid;
        const provider = user.providerData[0].providerId || user.providerId;
        console.log({
            displayName: displayName,
            email: email,
            uid: uid,
            provider: provider
        })
        let requestUrl;

        if (provider === 'google.com' && window.localStorage.getItem('signedUp') === 'false') {
            requestUrl = `${serverUrl}/users/googleSignup?displayName=${displayName}&uid=${uid}&provider=${provider}`;
            fetch(requestUrl)
                .then(result => {
                    if (result.ok) {
                        return result.json();
                    }
                    throw new Error('Request failed');
                }, networkError => console.log(networkError))
                .then(jsonResponse => {
                    console.log(jsonResponse.message);
                    window.localStorage.setItem('signedUp', true);
                })
        } else if (provider === 'facebook.com' && window.localStorage.getItem('signedUp') === 'false') {
            requestUrl = `${serverUrl}/users/facebookSignup?displayName=${displayName}&uid=${uid}&provider=${provider}`;
            fetch(requestUrl)
                .then(result => {
                    if (result.ok) {
                        return result.json();
                    } else {
                        return new Error ('Request failed.');
                    }
                }, networkError => console.log(networkError))
                .then(jsonResponse => {
                    console.log(jsonResponse);
                    window.localStorage.setItem('signedUp', true);
                })
        } else if (provider === 'password') {
            requestUrl = `${serverUrl}/users/emailSignup?email=${email}&uid=${uid}&provider=${provider}`;
            fetch(requestUrl)
                .then(result => {
                    if (result.ok) {
                        return result.json();
                    } else {
                        console.log(new Error('Request failed.'));
                    }
                })
                .then(jsonResponse => {
                    console.log(jsonResponse.message);
                })

            if (user.emailVerified === false) {
                const actionCodeSettings = {
                    url: `${localUrl}/verify?uid=${uid}`
                }
                user.sendEmailVerification(actionCodeSettings);
            }
        }
    }
})

exports.auth = firebase.auth();