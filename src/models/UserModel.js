const connection = require('../database/connection')

const uuid = require('react-uuid')

module.exports = {
    async create(user){
        try {
            user.user_id = uuid();
            const response = await connection('user').insert(user);
            return user.user_id;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },

    async read(){
        try {
            const response = await connection ('user').select('*');
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },

    async getAllByTypes(type){
        try {
            const response = await connection ('user').where('type', type).select('*');
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },

    async getAllByCompany(type){
        try {
            const response = await connection ('user').where('company', type).select('*');
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },


    async getById(id){
        try {
            const response = await connection('user').where('user_id', id).select('*');
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },

    async getUserByUid(firebase_id){
        try {
            const response = await connection ('user').where('firebase_id', firebase_id).select('*');
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },
    async update(user_id, updated_user){ 
        try {
            const response = await connection('user').where('user_id', user_id).update(updated_user);
           
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },
    async delete(user_id){
        try {
            const response = await connection('user').where('user_id', user_id).del();
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }
}
