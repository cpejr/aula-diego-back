const connection = require("../database/connection");

module.exports = {
  async create(FileLesson) {
    const response = await connection("file_lesson").insert(FileLesson);
    return response;
  },
  async read(filters) {
    const response = await connection("file_lesson")
      .where(filters)
      .andWhere("lesson.is_deleted", false)
      .andWhere("file.is_deleted", false)
      .join("lesson", "file_lesson.lesson_id", "lesson.id")
      .join("file", "file_lesson.file_id", "file.id")
      .select(
        "file.*",
        "lesson.name as lesson_name",
        "lesson.id as lesson_id"
      );
    return response;
  },
  async update(FileLesson) {
    const response = await connection("file_lesson")
      .where({ id: FileLesson.id })
      .update(FileLesson);
    return response;
  },
  async delete(id) {
    const response = await connection("file_lesson").where({ id }).delete();
    return response;
  },
};
