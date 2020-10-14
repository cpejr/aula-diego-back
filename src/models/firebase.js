const firebase = require("firebase/app");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBhBAMixNM-WB92sfFNvYmDTWYjchMB8NQ",
    authDomain: "aula-diego-36c79.firebaseapp.com",
    databaseURL: "https://aula-diego-36c79.firebaseio.com",
    projectId: "aula-diego-36c79",
    storageBucket: "aula-diego-36c79.appspot.com",
    messagingSenderId: "225647618283",
    appId: "1:225647618283:web:6fed421a2cfd96997ab6ae"
  };

  module.exports = {
    async createNewUser(email, password) {
        try {
            const result = await firebase.auth().createUserWithEmailAndPassword(email, password)
            return result.user.uid;
        }
        catch (error) {
            console.log(error);
        }
    },
    async createSession(email, password) {
        try {
            const result = await firebase.auth().signInWithEmailAndPassword(email, password)
            return result.user.uid;
        }
        catch (error) {
            console.log(error);
        }
    },
}

  firebase.initializeApp(firebaseConfig);

