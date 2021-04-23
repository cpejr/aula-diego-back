const connection = require("../database/connection");

module.exports = {
  async create(answer) {
    const response = await connection("answer").insert(answer, 'id');
    return response;
  },

  async getById(id) {
    const response = await connection("answer")
      .join("exercise", "answer.exercise_id", "exercise.id")
      .where("answer.id", id)
      .andWhere("answer.is_deleted", false)
      .andWhere("exercise.is_deleted", false)
      .select(
        "answer.*",
        "exercise.name as exercise_name",
        "exercise.id as exercise_id",
        "exercise.course_id as course_id",
        "exercise.questions as questions"
      )
      .first();

    return response;
  },

  async read(filters) {
    const response = await connection("answer")
      .join("exercise", "answer.exercise_id", "exercise.id")
      .join("user", "answer.user_id", "user.id")
      .where(filters)
      .andWhere("answer.is_deleted", false)
      .andWhere("exercise.is_deleted", false)
      .select(
        "answer.*",
        "exercise.name as exercise_name",
        "exercise.id as exercise_id",
        "exercise.course_id as course_id",
        "exercise.questions as questions",
        "user.name as user_name"
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
