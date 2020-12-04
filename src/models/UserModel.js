const connection = require('../database/connection')

const uuid = require('react-uuid')


module.exports = {
    async create(user) {
        user.user_id = uuid();
        const year = new Date().getFullYear()
        const firstday =`${year}-01-01`;
        const lastday = `${year}-12-31`;
        const {count} = await connection("user").whereBetween("created_at",[firstday,lastday]).count("user_id AS count").first();
        const matricula = year*10000 + count;
        matricula.toString();
        user.matricula = matricula;
        const response = await connection('user').insert(user);
        return user.user_id;

    },

    async read() {
            const response = await connection('user').select('*');
            return response;
        
    },

    async getAllByTypes(type) {
       
            const response = await connection('user').where('type', type).select('*');
            return response;
        
    },

    async getAllByCompany(type) {
        
            const response = await connection('user').where('company', type).select('*');
            return response;
        
    },


    async getById(id) {
        
            const response = await connection('user').where('user_id', id).select('*');
            return response;
    
    },

    async getUserByUid(firebase_id) {
       
            const response = await connection('user').where('firebase_id', firebase_id).select('*');
            return response;
    
    },
    async update(user_id, updated_user) {
        
            const response = await connection('user').where('user_id', user_id).update(updated_user);
            return response;
    
    },
    async delete(user_id) {
       
            const response = await connection('user').where('user_id', user_id).del();
            return response;
    
    }
}
