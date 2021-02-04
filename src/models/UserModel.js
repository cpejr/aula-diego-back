const connection = require("../database/connection");

module.exports = {
  async create(user) {
    const response = await connection("user").insert(user);
    return response;
  },

  async read() {
    const response = await connection("user").select("*");
    return response;
  },

  async getAllByTypes(type) {
    const response = await connection("user").where("type", type).select("*");
    return response;
  },

  async getAllByCompany(type) {
    const response = await connection("user")
      .where("company", type)
      .select("*");
    return response;
  },

  async getById(id) {
    const response = await connection("user")
      .where("id", id)
      .select("*")
      .first();
    return response;
  },

  async getUserByEmail(email) {
    const response = await connection("user")
      .where("email", email)
      .select("*")
      .first();
    return response;
  },

  async getUserByUid(firebase_id) {
    const response = await connection("user")
      .where("firebase_id", firebase_id)
      .select("*")
      .first();
    return response;
  },
  async update(id, updated_user) {
    const response = await connection("user")
      .where("id", id)
      .update(updated_user);
    return response;
  },
  async delete(id) {
    const response = await connection("user").where("id", id).del();
    return response;
  },

  async promoteUser(id) {
    const response = await connection("user")
      .where("id", id)
      .update("type", "admin");
    return response;
  },

  async demoteUser(id) {
    const response = await connection("user")
      .where("id", id)
      .update("type", "student");
    return response;
  },
};
