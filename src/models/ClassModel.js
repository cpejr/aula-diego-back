const connection = require("../database/connection");

module.exports = {
    async create(turma) {
        //foi colocado turma porque class é um nome reservado
        try {
            const response = await connection("class")
                .insert(turma);
            return response;
        }
        catch (error) {
            throw new Error("Erro");
        }
    },

    async getById(id) {
        try {
            const response = await connection("class")
                .where("class_id", id)
                .select('*');
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },

    async getAllByCompany(company) {
        try {
            const response = await connection("class")
                .where("company", company)
                .select("*");
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },

    async getUserInClass(id) {
        try {
            const response = await connection("users_in_class")
                .where("class_id", id)
                .select("user_id");
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },

    async update(id, turma) {
        try {
            const response = await connection("class")
                .where("class_id", id)
                .update(turma);
            return response;
        }
        catch (error) {
            console.log(error.message);
            return error;
        }
    },

    async delete(id) {
        try {
            const response = await connection("class")
                .where("class_id", id)
                .del();
            return response;
        }
        catch (error) {
            console.log(error.message);
            return error;
        }
    },

}