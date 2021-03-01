const connection = require("../database/connection");

module.exports = {
  async create(occupation) {
    const response = await connection("occupation").insert(occupation);
    return response;
  },
  async getById(id) {
    const response = await connection("occupation")
      .where({ id })
      .select("*")
      .first();
    return response;
  },
  async read(filters) {
    const response = await connection("occupation")
      .where(filters)
      .andWhere({ is_deleted: false })
      .select("*");
    return response;
  },
  async getAll() {
    const response = await connection("occupation")
      .join("organization", "occupation.organization_id", "organization.id")
      .where({ "occupation.is_deleted": false, "organization.is_deleted": false })
      .select("occupation.id", 
        "occupation.name", 
        "occupation.description", 
        "organization.name as organization_name"
      );
    return response;
  },
  async update(occupation) {
    const response = await connection("occupation")
      .where({ id: occupation.id })
      .update(occupation);
    return response;
  },
  async delete(id) {
    const response = await connection("occupation")
      .where({ id })
      .update({ is_deleted: true });
    return response;
  },
};
