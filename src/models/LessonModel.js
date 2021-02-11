const connection = require("../database/connection");

module.exports = {
    async createNewlesson(lesson) {
        try {
            const response = await connection("lesson").insert(lesson);
            return response;
        }
        catch (error) {throw new Error("Erro");}
    },

    async getById(id) {
        try {
            const response = await connection('lesson').where('id', id).select('*');
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },

    async deletelesson(id) {
        try {
            const response = await connection("lesson").where("id", id).del();
            return response;
        }
        catch (error) {
            console.log(error.message);
            return error;
        }
    },
    async updatelesson(id, lesson) {
        const response = await connection("lesson").where("id", id).update(lesson);
        return response;
    }
}