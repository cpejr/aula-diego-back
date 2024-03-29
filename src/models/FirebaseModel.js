const admin = require("firebase-admin");
const firebase = require("firebase/app");

require("firebase/auth");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASEURL,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID,
};

firebase.initializeApp(firebaseConfig);

var serviceAccount = require("../ServiceWorker.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASEURL,
});

module.exports = {
  async createNewUser(email, password) {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    return result.user.uid;
  },

  async createSession(email, password) {
    try {
      const result = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      return result.user.uid;
    } catch (error) {
      throw error;
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
          console.error(error);
          const errorMessage = error.message;
          reject(errorMessage);
        });
    });
  },

  // async changeUserPassword(uid, newPassword) {
  //   return new Promise((resolve, reject) => {
  //     firebase
  //       .auth()
  //       .updateUser(uid, {
  //         password: newPassword,
  //       })
  //       .then((result) => {
  //         resolve(result);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         const errorMessage = error.message;
  //         reject(errorMessage);
  //       });
  //   });
  // },
  async changeUserPassword(uid, newPassword) {
    return new Promise((resolve, reject) => {
      admin
        .auth()
        .updateUser(uid, {
          password: newPassword,
        })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          console.error(error);
          const errorMessage = error.message;
          reject(errorMessage);
        });
    });
  },
  async sendPasswordChangeEmail(emailAddress) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .sendPasswordResetEmail(emailAddress)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          console.error(error);
          const errorMessage = error;
          reject(error);
        });
    });
  },
  async forgotPassword(email) {
    const response = await firebase.auth().sendPasswordResetEmail(email);
    return response;
  },
};
