const connection = require("../database/connection");

module.exports = {
  async create(live) {
    const response = await connection("live").insert(live);
    return response;
  },

  async getById(id) {
    const response = await connection("live").where({ id }).select("*").first();
    return response;
  },

  async read(filters) {
    const response = await connection("live")
      .where(filters)
      .andWhere({ is_deleted: false })
      .select("*");
    return response;
  },

  async update(live, live_id) {
    const response = await connection("live")
      .where({ id: live_id })
      .update(live);
    return response;
  },

  async delete(id) {
    const response = await connection("live")
      .where({ id })
      .update({ is_deleted: true });
    return response;
  },
};
