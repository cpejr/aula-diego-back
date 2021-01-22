const { query } = require("express");
const connection = require("../database/connection");

module.exports = {
  async create(class_id, admin_id) {
    const response = await connection("class_admin").insert({ class_id, admin_id });
    return response;
  },

  async read(filters){
    const response = await connection("class_admin").where(filters).select("*");
    response = response.length == 1 ? response[0] : response;
    return response;
  },

  /*async getAllByAdmin(admin_id) {
    const response = await connection("class_admin").where({ admin_id }).select("*");
    return response;
  },

  async getByClassAndAdmin(class_id, admin_id) {
    const response = await connection("class_admin")
      .where( { class_id, admin_id } )
      .select("*")
      .first();
    return response;
  },

  async getAllByClass(class_id) {
    const response = await connection("class_admin")
      .where( { class_id } )
      .select("*");
    return response;
  },

  async getById(id) {
    const response = await connection("class_admin")
      .where({ id })
      .select("*")
      .first();
    return response;
  },*/

  async delete(id) {
    const response = await connection("class_admin").where({ id }).del();
    return response;
  },

  async deleteByClassAndAdmin(class_id, admin_id) {
    const response = await connection("class_admin").where({ class_id, admin_id }).del();
    return response;
  },
};
