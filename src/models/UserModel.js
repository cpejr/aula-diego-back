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
    const response = await connection("user")
      .where(filters)
      .andWhere({ is_deleted: false })
      .select("*");
    return response;
  },
  async getAllByStatus(status) {
    const response = await connection("user")
      .where("status", status)
      .select("*");
    return response;
  },
  async update(user) {
    const response = await connection("user")
      .where({ id: user.id })
      .update(user);
    return response;
  },
  async delete(id) {
    const response = await connection("user")
      .where({ id })
      .update({ is_deleted: true });
    return response;
  },
};
