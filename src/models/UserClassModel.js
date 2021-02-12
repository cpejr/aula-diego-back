const connection = require("../database/connection");

module.exports = {
  async create(userClass) {
    const response = await connection("userClass").insert(userClass);
    return response;
  },
  async read(filters) {
    const response = await connection("userClass")
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
    const response = await connection("userClass")
      .where({ id: userClass.id })
      .update(userClass);
    return response;
  },
  async delete(id) {
    const response = await connection("userClass")
      .where({ id })
      .update({ is_deleted: true });
    return response;
  },
};
