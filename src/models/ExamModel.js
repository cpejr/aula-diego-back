const connection = require("../database/connection");

module.exports = {
  async create(exam) {
    const response = await connection("exam").insert(exam);
    return response;
  },

  async getById(id) {
    const response = await connection("exam").where({ id }).select("*").first();
    return response;
  },

  async read(filters) {
    const response = await connection("exam")
      .join("course", "exam.course_id", "course.id")
      .where(filters)
      .andWhere("exam.is_deleted", false)
      .andWhere("course.is_deleted", false)
      .select(
        "exam.*",
        "course.name as course_name"
      );
    return response;
  },

  async update(exam, exam_id) {
    const response = await connection("exam")
      .where({ id: exam_id })
      .update(exam);
    return response;
  },

  async delete(id) {
    const response = await connection("exam")
      .where({ id })
      .update({ is_deleted: true });
    return response;
  },
};
