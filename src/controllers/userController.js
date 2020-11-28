const UserModel = require('../models/UserModel')
const FirebaseModel = require('../models/FirebaseModel')
const { createNewUser } = require('../models/FirebaseModel');




module.exports = {

    async createUser(request,response){
        let firebaseUid;

        try {
            const user = {
                name:request.body.name,
                email: request.body.email,
                company:request.body.company,
                birthdate: request.body.birthdate,
                phone: request.body.phone,
                occupation: request.body.occupation,
                matricula: request.body.matricula,
                password: request.body.password

            };
        
        if (user.type ==='admin' || user.type === 'student' || user.type === 'master'){
            const loggedUser = request.session;

        if(loggedUser && loggedUser.type !== 'admin'){
            return response.status(403).json('Operção não permitida')
        }    
        }

        firebaseUid = await FirebaseModel.createNewUser(user.email, user.password);
        
        delete user.password

        user.firebase_id = firebaseUid;

        const resposta = await UserModel.create(user);

       
        return response.status(200).json('Usuário Criado com succeso!!!!!')
        }

        catch(error){
            if(firebaseUid){
                FirebaseModel.deleteUser(firebaseUid)
                throw new Error ('Erro no firebase')
            }
            console.warn(error.message);
            response.status(500).json('internal server error')
        }
    },



}