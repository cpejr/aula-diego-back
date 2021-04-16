const connection = require("../database/connection");

module.exports = {
  async create(answer) {
    const response = await connection("answer").insert(answer);
    return response;
  },

  async getById(id) {
    const response = await connection("answer")
    .join("exercise", "answer.exercise_id", "exercise.id")
    .where("answer.id", id)
    .andWhere("answer.is_deleted", false)
    .andWhere("exam.is_deleted", false)
    .select(
      "answer.*",
      "exercise.name as name",
      "exercise.questions as questions"
    )
    .first();

    return response;
  },

  async read(filters) {
    const response = await connection("answer")
      .join("exam", "answer.exam_id", "exam.id")
      .where(filters)
      .andWhere("answer.is_deleted", false)
      .andWhere("exam.is_deleted", false)
      .select(
        "answer.*",
        "exam.name as exam_name",
        "exam.questions as questions"
      );
    return response;
  },

  async update(answer, exam_id) {
    const response = await connection("answer")
      .where({ id: exam_id })
      .update(answer);
    return response;
  },

  async delete(id) {
    const response = await connection("answer")
      .where({ id })
      .update({ is_deleted: true });
    return response;
  },
};
