const admin = require("firebase-admin");
const firebase = require("firebase/app");

require("firebase/auth");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
     apiKey: "AIzaSyBhBAMixNM-WB92sfFNvYmDTWYjchMB8NQ",
     authDomain: "aula-diego-36c79.firebaseapp.com",
     databaseURL: "https://aula-diego-36c79.firebaseio.com/",
     projectId: "aula-diego-36c79",
     storageBucket: "aula-diego-36c79.appspot.com",
     messagingSenderId: "225647618283",
     appId: "1:225647618283:web:6fed421a2cfd96997ab6ae",
     measurementId: "G-6BJL1YJDSD"

    // apiKey: process.env.API_KEY,
    // authDomain: process.env.AUTH_DOMAIN,
    // databaseURL: process.env.DATABASEURL,
    // projectId: process.env.PROJECTID,
    // storageBucket: process.env.STORAGEBUCKET,
    // messagingSenderId: process.env.MESSAGINGSENDERID,
    // appId: process.env.APPID,
    // measurementId: process.env.MEASUREMENTID
};

firebase.initializeApp(firebaseConfig);

var serviceAccount = require("../ServiceWorker.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASEURL
});

module.exports = {
  async createNewUser(email, password) {
    try {
      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      return result.user.uid;
    } catch (error) {
      console.log(error);
    }
  },

  async createSession(email, password) {
    try {
      const result = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      return result.user.uid;
    } catch (error) {
      console.log(error);
    }
  },

  async deleteUser(uid) {
    return new Promise((resolve, reject) => {
      admin
        .auth()
        .deleteUser(uid)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          console.log(error);
          const errorMessage = error.message;
          reject(errorMessage);
        });
    });
  },

  async changeUserPassword(uid, newPassword) {
    return new Promise((resolve, reject) => {
        firebase.auth().updateUser(uid, {
        password: newPassword
        })
        .then((result) => {
            resolve(result);
        })
        .catch((error) => {
            console.log(error);
            const errorMessage = error.message;
            reject(errorMessage);
        })
    })
},
};
