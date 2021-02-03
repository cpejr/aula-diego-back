const connection = require("../database/connection");

module.exports ={
    async create(occupation){
        try{
            const response = await connection("occupation")
                .insert(occupation);
            return response;
        }
        catch(error){
            throw new Error("Erro");
        }
    },
    
    async getById(id){
        try {
            const response = await connection("occupation")
                .where("id", id)
                .select('*');
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },

    async getAllByOrganization(organization) {
        try {
            const response = await connection("occupation")
                .where("organization", organization)
                .select("*");
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
      },
    
    async update(id, occupation){
        try{
            const response = await connection("occupation")
                .where("id",id)
                .update(occupation);
            return response;
        }
        catch(error){
            console.log(error.message);
            return error;
        }
    },

    async delete(id){
        try{
            const response = await connection("occupation")
                .where("id", id)
                .del();
            return response;
        }
        catch(error){
            console.log(error.message);
            return error;
        }
    },
    
}