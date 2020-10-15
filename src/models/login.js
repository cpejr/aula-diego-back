const firebase = require("firebase/app");

module.export = {
async createSession(email, password){
    try {
        const result = await firebase.auth().signInWithEmailAndPassword(email, password)
        return result.user.uid;
    }
    catch (error) {
        console.log(error);
    }
}
}
