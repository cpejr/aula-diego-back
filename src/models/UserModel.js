const connection = require("../database/connection");

module.exports = {
  async create(user) {
    const response = await connection("user").insert(user);
    return response;
  },
  async getById(id) {
    const response = await connection("user").where({ id }).select("*").first();
    return response;
  },
  async read(filters) {
    const response = await connection("user").where(filters).select("*");
    return response;
  },
  async update(user) {
    const response = await connection("user")
      .where({ id: user.id })
      .update(user);
    return response;
  },
  async delete(id) {
    const response = await connection("user").where({ id }).select("*");
    return response;
  },
};
