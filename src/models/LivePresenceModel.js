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
      .join("live", "live.id", "live_presence.live_id")
      .join("class", "live.course_id", "class.course_id")
      .join("course", "live.course_id", "course.id")
      .distinct("live.id")
      .select(
        "live.id as live_id",
        "live.name as live_name",
        "live.description as live_description",
        "course.id as course_id",
        "course.name as course_name",
        "class.name as class_name",
        "user.name as user_name",
        "user.registration as user_registration",
        "user.id as user_id"
      );
    return present;
  },
  async getLiveCount(user_id) {
    /*select count(l.id) as num_lives from user_class as uc
      inner join "class" c ON c.id = uc.class_id
      inner join live l on l.course_id = c.course_id
      where uc.user_id = 'ccf04c46-cd1f-4cdc-b5f7-b8ad15610ed5'::uuid*/

    let numLives = await connection("user_class")
      .join("class", "user_class.class_id", "class.id")
      .join("live", "live.course_id", "class.course_id")
      .where({ "user_class.user_id": user_id })
      .count("live.id")
      .first();

    numLives = numLives.count;

    return numLives;
  },
  async getAudience(filters) {
    console.log(filters);
    const response = await connection("live_presence")
      .where(filters)
      .count("live_id");
    console.log(response);
    return response;
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
