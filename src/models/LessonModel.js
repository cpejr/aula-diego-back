const connection = require("../database/connection");

module.exports = {
  async create(lesson) {
    const response = await connection("lesson").insert(lesson, "id");
    return response;
  },

  async getById(id) {
    const response = await connection("lesson")
      .where({ id })
      .select("*")
      .first();
    return response;
  },

  async read(filters) {
    const response = await connection("lesson")
      .where(filters)
      .andWhere({ is_deleted: false })
      .select("*");
    return response;
  },

  async getById(id) {
    const response = await connection("lesson")
      .where({ id })
      .select("*")
      .first();
    return response;
  },

  async update(lesson, lesson_id) {
    const response = await connection("lesson")
      .where({ id: lesson_id })
      .update(lesson);
    return response;
  },

  async delete(id) {
    const response = await connection("lesson")
      .where({ id })
      .update({ is_deleted: true });
    return response;
  },
};
