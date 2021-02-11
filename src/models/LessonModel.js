const connection = require("../database/connection");

module.exports = {
  async create(lesson) {
    const response = await connection("lesson").insert(lesson);
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
    const response = await connection("lesson").where(filters).select("*");
    return response;
  },

  async update(lesson) {
    const response = await connection("lesson")
      .where({ id: lesson.id })
      .update(lesson);
    return response;
  },
  async delete(id) {
    const response = await connection("lesson").where({ id }).delete();
    return response;
  },
};
