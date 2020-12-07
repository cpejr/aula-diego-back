const connection = require("../database/connection");

module.exports ={
    async createNewLive(live){
    try{

        const response = await connection("live").insert(live);
        
        return response;
    }
    catch(error){
        throw new Error("Erro")

    }

    },
    
    async getById(id){
        try {
            const response = await connection('live').where('live_id', id).select('*');
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },

    async deleteLive(live_id){
        try{
            const response = await connection("live").where("live_id",live_id).del();
            return response;

        }
        catch(error){
            console.log(error.message);
            return error;
        }
    },
    async updateLive(live_id,live){
        const response = await connection("live").where("live_id",live_id).update(live);
        return response;
    }
}