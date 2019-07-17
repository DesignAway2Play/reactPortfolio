import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";
import "firebase/auth";

// var admin = require('firebase-admin');
// var serviceAccount = require('../ServiceAccountKey.json')
firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
});

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });

// APIs and config vars

// const uid ="";
// admin.auth().createCustomToken(uid)
// .then((customToken) => {
//     console.log(customToken)
// })
// .catch((error) => {
//     console.log("error creating token")
// })
const google_provider = new firebase.auth.GoogleAuthProvider();
const database = firebase.database();
const auth = firebase.auth();
const curU = auth.currentUser

// functions
function login() {
    return auth.signInWithPopup(google_provider);
}

function logout() {
    return firebase.auth().signOut().then(function() {
        console.log('Signed Out');
      }).catch(function(error) {
        console.log('Error');
      });
}

function createWork(ref, work) {
    return database.ref(ref).push(work);
}

function removeWork(ref, id) {
    return database.ref(`${ref}/${id}`).remove();
}

function updateWork(worksRef, id) {
    let ref = database.worksRef(`${worksRef}/${id}`)
    ref.once('value', snapshot => {
        let work = snapshot.val();
        work.update({ work });
    });
}

export {
    login,
    logout,
    auth,
    curU,
    database,
    createWork,
    removeWork,
    updateWork
}