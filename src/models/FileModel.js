const connection = require("../database/connection");

module.exports = {
  async create(file) {
    const response = await connection("file").insert(file);
    return response;
  },
  async getById(id) {
    const response = await connection("file").where({ id }).select("*").first();
    return response;
  },
  async read(filters) {
    const response = await connection("file")
      .where(filters)
      .andWhere({ is_deleted: false })
      .select("*");
    return response;
  },
  async update(file) {
    const response = await connection("file")
      .where({ id: file.id })
      .update(file);
    return response;
  },
  async delete(id) {
    const response = await connection("file")
      .where({ id })
      .update({ is_deleted: true });
    return response;
  },
};
