const connection = require("../database/connection");

module.exports = {
  async create(lessonPresence) {
    const response = await connection("lesson_presence").insert(lessonPresence);
    return response;
  },
  async read(filters) {
    const response = await connection("lesson_presence")
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
  async getLessonCount(user_id) {
    /* 
      select count(l.id) as num_lives from user_class as uc
      inner join "class" c ON c.id = uc.class_id
      inner join live l on l.course_id = c.course_id
      where uc.user_id = 'ccf04c46-cd1f-4cdc-b5f7-b8ad15610ed5'::uuid
      */

    let numLessons = await connection("user_class")
      .join("class", "user_class.class_id", "class.id")
      .join("lesson", "lesson.course_id", "class.course_id")
      .where({ "user_class.user_id": user_id })
      .count("lesson.id")
      .first();

    numLessons = numLessons.count;

    return numLessons;
  },
  async update(lessonPresence) {
    const response = await connection("lesson_presence")
      .where({ id: lessonPresence.id })
      .update(lessonPresence);
    return response;
  },
  async delete(id) {
    const response = await connection("lesson_presence").where({ id }).delete();
    return response;
  },
};
