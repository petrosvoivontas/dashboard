const {auth} = require('./firebase');
const {googleProvider, facebookProvider} = require('./auth_providers');

exports.emailSignup = (email, password) => {
    auth.createUserWithEmailAndPassword(email, password)
    .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return {
            errorCode: errorCode,
            errorMessage: errorMessage
        }
    })
}

exports.emailLogin = (email, password) => {
    auth.signInWithEmailAndPassword(email, password)
    .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return {
            errorCode: errorCode,
            errorMessage: errorMessage
        }
    })
}

// exports.sendLinkToEmail = email => {
//     auth.sendSignInLinkToEmail(email, actionCodeSettings)
//         .then(() => {
            
//         }).catch(error => {
//             console.log(error);
//         })
// }

exports.googleSignup = () => auth.signInWithPopup(googleProvider)
    .then(result => {
        const token = result.credential.accessToken;
        const user = result.user;
        return {
            token: token,
            user: user
        }
    }).catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        return {
            errorCode: errorCode,
            errorMessage: errorMessage,
            email: email,
            credential: credential
        }
    })

exports.facebookSignup = () => auth.signInWithPopup(facebookProvider)
    .then(result => {
        const token = result.credential.accessToken;
        const user = result.user;
        return {
            token: token,
            user: user
        }
    }).catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        return {
            errorCode: errorCode,
            errorMessage: errorMessage,
            email: email,
            credential: credential
        }
    })

exports.getFacebookResult = () => auth.getRedirectResult()
    .then(result => {
        let token;
        if (result.credential) {
            token = result.credential.accessToken;
        }
        const user = result.user;
        return {
            token: token,
            user: user
        }
    }).catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        return {
            errorCode: errorCode,
            errorMessage: errorMessage,
            email: email,
            credential: credential
        }
    })