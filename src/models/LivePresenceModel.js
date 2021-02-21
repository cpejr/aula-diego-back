const connection = require("../database/connection");

module.exports = {
  async create(livePresence) {
    const response = await connection("live_presence").insert(livePresence);
    return response;
  },
  async read(filters) {
    const present = await connection("live_presence")
      .where(filters)
      .andWhere("user.is_deleted", false)
      .andWhere("live.is_deleted", false)
      .join("user", "live_presence.user_id", "user.id")
      .join("live", "live_presence.live_id", "live.id")
      .join("course", "live.course_id", "course.id")
      .join("class", "course.id", "class.course_id")
      .select(
        "live.id as live_id",
        "live.description as live_description",
        "course.id as course_id",
        "course.name as course_name",
        "user.name as user_name",
        "user.registration as user_registration",
        "user.id as user_id",
        "class.name as class_name"
      );

    return present;
  },
  async update(livePresence) {
    const response = await connection("live_presence")
      .where({ id: livePresence.id })
      .update(livePresence);
    return response;
  },
  async delete(id) {
    const response = await connection("live_presence").where({ id }).delete();
    return response;
  },
};
