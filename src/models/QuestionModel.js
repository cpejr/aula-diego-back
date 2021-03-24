const connection = require("../database/connection");

module.exports = {
  async create(question) {
    const response = await connection("question").insert(question);
    return response;
  },

  async getById(id) {
    const response = await connection("question")
      .where({ id })
      .select("*")
      .first();
    return response;
  },

  async read(filters) {
    const response = await connection("question")
      .where({ ...filters, is_deleted: false })
      .select("*");
    return response;
  },

  async update(question) {
    const response = await connection("question")
      .where({ id: question.id })
      .update(question);
    return response;
  },

  async delete(id) {
    const response = await connection("question")
      .where({ id })
      .update({ is_deleted: true });

    return response;
  },
};
