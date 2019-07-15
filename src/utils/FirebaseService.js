import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: "",
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
});

// APIs and config vars

const google_provider = new firebase.auth.GoogleAuthProvider();
const database = firebase.database();
const auth = firebase.auth();

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

function createTodo(ref, todo) {
    return database.ref(ref).push(todo);
}

function removeTodo(ref, id) {
    return database.ref(`${ref}/${id}`).remove();
}

function updateComplete(dbRef, id) {
    let ref = database.dbRef(`${dbRef}/${id}`)
    ref.once('value', snapshot => {
        let todo = snapshot.val();
        todo.update({completed: !todo.completed });
    });
}

export {
    login,
    logout,
    auth,
    database,
    createTodo,
    removeTodo,
    updateComplete
}