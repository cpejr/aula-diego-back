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
      .andWhere({ "user.is_deleted": "false" })
      .andWhere({ "organization.is_deleted": "false" })
      .andWhere({ "occupation.is_deleted": "false" })
      .join("organization", "organization.id", "user.organization_id")
      .join("occupation", "occupation.id", "user.occupation_id")
      .select(
        "user.*",
        "organization.name as organization_name",
        "occupation.name as occupation_name"
      );
    return response;
  },
  async update(update) {
    const response = await connection("user")
      .where({ id: update.id })
      .update(update);
    return response;
  },
  async delete(id) {
    const response = await connection("user")
      .where({ id })
      .update({ is_deleted: true });
    return response;
  },
};
