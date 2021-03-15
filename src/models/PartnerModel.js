const connection = require("../database/connection");

module.exports = {
  async create(partner) {
    const response = await connection("partner").insert(partner, "id");
    return response;
  },

  async getById(id) {
    const response = await connection("partner")
      .where({ id })
      .select("*")
      .first();
    return response;
  },

  async read(filters) {
    const response = await connection("partner")
      .where(filters)
      .andWhere({ "partner.is_deleted": false })
      .andWhere({ "file.is_deleted": false })
      .join("file", "file.id", "partner.file_id")
      .select(
        "partner.*",
        "file.id as file_id",
        "file.path as logo"
      );
      
    return response;
  },

  async update(partner) {
    const response = await connection("partner")
      .where({ id: partner.id })
      .update(partner);

    return response;
  },

  async delete(id) {
    const response = await connection("partner")
      .where({ id })
      .update({ is_deleted: true });

    return response;
  },
};
