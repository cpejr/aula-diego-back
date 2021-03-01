const connection = require("../database/connection");

module.exports = {
  async create(userClass) {
    const response = await connection("user_class").insert(userClass);
    return response;
  },
  async read(filters) {
    const response = await connection("user_class")
      .where(filters)
      .andWhere("user.is_deleted", false)
      .andWhere("class.is_deleted", false)
      .join("user", "class_presence.user_id", "user.id")
      .join("class", "class_presence.class_id", "class.id")
      .select(
        "class.*",
        "user.name as user_name",
        "user.registration as user_registration"
      );
    return response;
  },
  async update(userClass) {
    const response = await connection("user_class")
      .where({ id: userClass.id })
      .update(userClass);
    return response;
  },
  async delete(class_id, user_id) {
    const response = await connection("user_class")
      .where({
        "class_id": class_id,
        "user_id": user_id
      })
      .del();
    return response;
  },
};
