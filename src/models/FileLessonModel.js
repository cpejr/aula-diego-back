const connection = require("../database/connection");

module.exports = {
  async create(FileLesson) {
    const response = await connection("FileLesson").insert(FileLesson);
    return response;
  },
  async read(filters) {
    const response = await connection("FileLesson")
      .where(filters)
      .andWhere("user.is_deleted", false)
      .andWhere("file.is_deleted", false)
      .join("user", "file_presence.user_id", "user.id")
      .join("file", "file_presence.file_id", "file.id")
      .select(
        "file.*",
        "user.name as user_name",
        "user.registration as user_registration"
      );
    return response;
  },
  async update(FileLesson) {
    const response = await connection("FileLesson")
      .where({ id: FileLesson.id })
      .update(FileLesson);
    return response;
  },
  async delete(id) {
    const response = await connection("FileLesson").where({ id }).delete();
    return response;
  },
};
