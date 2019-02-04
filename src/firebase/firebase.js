const {url} = require('../config');
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
        const displayName = user.displayName;
        const uid = user.uid;
        const provider = 'google';
        let requestUrl;
        requestUrl = `${url}/users/google?displayName=${displayName}&uid=${uid}&provider=${provider}`
        fetch(requestUrl)
            .then(result => {
                if (result.ok) {
                    return result.json();
                }
                throw new Error('Request faild');
            }, networkError => console.log(networkError))
            .then(jsonResponse => {
                console.log('This is the json response', jsonResponse);
            })
        if (user.emailVerified) {
            requestUrl = `${url}/users/verify?displayName=${displayName}&uid=${uid}&provider=${provider}`;
            fetch(requestUrl)
                .then(result => {
                    if (result.ok) {
                        return result.json();
                    }
                    throw new Error('Request failed;')
                }, networkError => console.log(networkError))
                .then(jsonResponse => {
                    console.log('This is the verification response', jsonResponse);
                })
        } else {
            user.sendEmailVerification();
        }
    }
})

exports.auth = firebase.auth();