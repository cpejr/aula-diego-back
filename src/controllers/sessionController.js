const UserModel = require('../models/UserModel')
const FirebaseModel = require('../models/FirebaseModel')
const jwt = require('jsonwebtoken')

const token = '30fa6e70c44ab19de9c630a0f1177308a517c974b764dc6ad4c2b272b5bd2255520643830c77d682621104143dd3e17ec8f65e23e65bb60635a644de111bbf31'

module.exports = {

    async signin(request,response){
        try{
            const {email,password} = request.body;
            let firebaseUid;

            try{
                firebaseUid = await FirebaseModel.createSession(email,password)
            }
            catch (error) {
                return response.status(403).json({ message: 'Invalid Credentials' });
        }
            const user = await UserModel.getUserByUid(firebaseUid)
            console.log(user)

            const accessToken = jwt.sign({user},process.env.AUTH_TOKEN_SECRET, {expiresIn:'30d'})
            return response.status(200).json({ accessToken, user });
        }
        catch(error){
            return response.status(500).json({ message: 'Error while trying to validate credentials' })
    }


    }

}