const connection = require("../database/connection");

module.exports = {
  async create(livePresence) {
    const response = await connection("livePresence").insert(livePresence);
    return response;
  },
  async read(filters) {
    const response = await connection("livePresence")
      .where(filters)
      .andWhere("user.is_deleted", false)
      .andWhere("live.is_deleted", false)
      .join("user", "live_presence.user_id", "user.id")
      .join("live", "live_presence.live_id", "live.id")
      .select(
        "live.*",
        "user.name as user_name",
        "user.registration as user_registration"
      );
    return response;
  },
  async update(livePresence) {
    const response = await connection("livePresence")
      .where({ id: livePresence.id })
      .update(livePresence);
    return response;
  },
  async delete(id) {
    const response = await connection("livePresence").where({ id }).delete();
    return response;
  },
};
