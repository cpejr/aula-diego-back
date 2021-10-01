const connection = require("../database/connection");

module.exports = {
  async create(certificate) {
    const response = await connection("certificate").insert(certificate);
    return response;
  },

  async getById(id) {
    const response = await connection("certificate")
      .where({ "certificate.id": id })
      .join("user", "user.id", "certificate.user_id")
      .join("course", "course.id", "certificate.course_id")
      .select(
        "certificate.*",
        "user.name as user_name",
        "course.name as course_name"
      )
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
