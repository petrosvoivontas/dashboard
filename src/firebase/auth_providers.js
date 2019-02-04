const firebase = require('firebase');

exports.googleProvider = new firebase.auth.GoogleAuthProvider();
exports.facebookProvider = new firebase.auth.FacebookAuthProvider();