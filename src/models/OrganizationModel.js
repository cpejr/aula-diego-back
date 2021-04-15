const connection = require("../database/connection");

module.exports = {
  async create(organization) {
    const response = await connection("organization").insert(organization);
    return response;
  },
  async getById(id) {
    const response = await connection("organization")
      .where({ id })
      .select("*")
      .first();
    return response;
  },
  async read(filters) {
    const response = await connection("organization")
      .where(filters)
      .andWhere({ is_deleted: false })
      .select("*");
    return response;
  },
  async update(organization) {
    const response = await connection("organization")
      .where({ id: organization.id })
      .update(organization);
    return response;
  },
  async delete(id) {
    const response = await connection("organization")
      .where({ id })
      .update({ is_deleted: true });
    return response;
  },
};
