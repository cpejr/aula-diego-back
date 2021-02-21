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
      .andWhere("user.is_deleted", "false")
      .join("organization", "user.organization_id", "organization.id")
      .join("occupation", "user.occupation_id", "occupation.id")
      .select(
        "user.*",
        "organization.name as organization_name",
        "occupation.name as occupation_name"
      );
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
