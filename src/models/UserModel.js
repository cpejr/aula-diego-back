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
        "user.name",
        "user.email",
        "user.phone",
        "user.registration",
        "user.birthdate",
        "user.firebase_id",
        "user.type",
        "user.status",
        "user.organization_id",
        "user.occupation_id",
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
