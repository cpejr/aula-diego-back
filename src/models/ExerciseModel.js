const connection = require("../database/connection");

module.exports = {
  async create(exercise) {
    const response = await connection("exercise").insert(exercise);
    return response;
  },

  async getById(id) {
    const response = await connection("exercise").where({ id }).select("*").first();

    const questions = response.questions;
    const keys = Object.keys(questions);

    for (const key in keys) {
      if (questions[key].alternatives !== undefined)
        delete questions[key].alternatives.correct;
    }

    response.questions = questions;
    return response;
  },

  async read(filters) {
    const response = await connection("exercise")
      .join("course", "exercise.course_id", "course.id")
      .where(filters)
      .andWhere("exercise.is_deleted", false)
      .andWhere("course.is_deleted", false)
      .select(
        "exercise.*",
        "course.name as course_name"
      );
    return response;
  },

  async update(exercise, exam_id) {
    const response = await connection("exercise")
      .where({ id: exam_id })
      .update(exercise);
    return response;
  },

  async delete(id) {
    const response = await connection("exercise")
      .where({ id })
      .update({ is_deleted: true });
    return response;
  },
};
