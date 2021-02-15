const connection = require("../database/connection");

module.exports = {
  async create(lessonPresence) {
    const response = await connection("lessonPresence").insert(lessonPresence);
    return response;
  },
  async read(filters) {
    const response = await connection("lessonPresence")
      .where(filters)
      .andWhere("user.is_deleted", false)
      .andWhere("lesson.is_deleted", false)
      .join("user", "lesson_presence.user_id", "user.id")
      .join("lesson", "lesson_presence.lesson_id", "lesson.id")
      .select(
        "lesson.*",
        "user.name as user_name",
        "user.registration as user_registration"
      );
    return response;
  },
  async update(lessonPresence) {
    const response = await connection("lessonPresence")
      .where({ id: lessonPresence.id })
      .update(lessonPresence);
    return response;
  },
  async delete(id) {
    const response = await connection("lessonPresence").where({ id }).delete();
    return response;
  },
};
