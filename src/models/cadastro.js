const firebase = require("firebase/app");

module.exports = {
    async createNewUser(email, password) {
        try {
            const result = await firebase.auth().createUserWithEmailAndPassword(email, password)
            return result.user.uid;
        }
        catch (error) {
            console.log(error);
        }
    }
}