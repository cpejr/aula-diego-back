const connection = require("../database/connection");

module.exports = {
  async create(organization) {
    const response = await connection("organization").insert(organization);
    return response;
  },
  async getById(id) {
    const response = await connection("organization")
      .where({ id })
      .andWhere("organization.is_deleted", false)
      .join("file", "organization.file_id", "file.id")
      .select("organization.*")
      .select("file.path as logo")
      .first();
    return response;
  },
  async read(filters) {
    const response = await connection("organization")
      .where(filters)
      .andWhere("organization.is_deleted", false)
      .join("file", "organization.file_id", "file.id")
      .select("organization.*")
      .select("file.path as logo");
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
