const connection = require("../database/connection");

module.exports = {
    async createNewLive(live) {
        try {
            const response = await connection("live").insert(live);
            return response;
        }
        catch (error) {throw new Error("Erro");}
    },

    async getById(id) {
        try {
            const response = await connection('live').where('id', id).select('*');
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },

    async deleteLive(id) {
        try {
            const response = await connection("live").where("id", id).del();
            return response;
        }
        catch (error) {
            console.log(error.message);
            return error;
        }
    },
    async updateLive(id, live) {
        const response = await connection("live").where("id", id).update(live);
        return response;
    }
}