const connection = require("../database/connection");

module.exports = {
  async create(course) {
    const response = await connection("course").insert(course);
    return response;
  },
  async getById(id) {
    const response = await connection("course")
      .where({ id })
      .select("*")
      .first();
    return response;
  },
  async read(filters) {
    const response = await connection("course")
      .where(filters)
      .andWhere({ is_deleted: false })
      .select("*");
    return response;
  },
  async update(course) {
    const response = await connection("course")
      .where({ id: course.id })
      .andWhere({ is_deleted: false })
      .update(course);
    return response;
  },
  async delete(id) {
    const response = await connection("course")
      .where({ id })
      .update({ is_deleted: true });
    return response;
  },
};
