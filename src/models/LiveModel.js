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
      .andWhere("live.is_deleted", false)
      .andWhere("course.is_deleted", false)
      .join("course", "live.course_id", "course.id")
      .join("organization", "course.organization_id", "organization.id")
      .select(
        "live.id as id",
        "live.name as name",
        "live.date as date",
        "live.description as description",
        "course.id as course_id",
        "course.name as course_name",
        "organization.id as organization_id",
        "organization.name as organization_name"
      );
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
