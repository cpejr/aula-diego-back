const connection = require("../database/connection");

module.exports = {
  async create(certificate) {
    const response = await connection("certificate").insert(certificate);
    return response;
  },

  async getById(id) {
    const response = await connection("certificate")
      .where({ id })
      .select("*")
      .first();
    return response;
  },

  async getByUserIdAndCourseId(userId, courseId) {
    const response = await connection("certificate")
      .where({
        user_id: userId,
        course_id: courseId,
      })
      .first();
    return response;
  },

  async delete(id) {
    const response = await connection("certificate").where({ id }).delete();
    return response;
  },
};
