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
      .andWhereNot({ "user.is_deleted": "true" })
      .join("organization", "organization.id", "user.organization_id")
      .join("occupation", "occupation.id", "user.occupation_id")
      .select(
        "user.*",
        "organization.name as organization_name",
        "occupation.name as occupation_name"
      );
    return response;
  },
  async update(id ,update) {
    const response = await connection("user")
      .where({ id: id })
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
