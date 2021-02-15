const connection = require("../database/connection");

module.exports = {
  async create(course) {
    const response = await connection("course").insert(course);
    return response;
  },
  async getById(id) {
    const response = await connection("course")
      .where({ id })
      .innerJoin("organization", "course.organization_id", "organization.id")
      .select("course.*", "organization.name as organization")
      .first();
    return response;
  },
  async getByUserId(user_id) {
    const response = await connection("user_class")
      .where({ user_id })
      .andWhereNot("class.is_deleted", "true")
      .andWhereNot("course.is_deleted", "true")
      .andWhereNot("user.is_deleted", "true")
      .join("user", "user.id", "user_class.user_id")
      .join("organization", "organization.id", "user.organization_id")
      .join("class", "class.id", "user_class.class_id")
      .join("course", "course.id", "class.course_id")
      .select(
        "organization.id as organization_id",
        "organization.name as organization_name",
        "class.id as class_id",
        "class.name as class_name",
        "course.id as course_id",
        "course.name as course_name",
        "course.description as course_description"
      );
    return response;
  },
  async read(filters) {
    const response = await connection("course")
      .where(filters)
      .andWhere("course.is_deleted", "false")
      .innerJoin("organization", "course.organization_id", "organization.id")
      .select("course.*", "organization.name as organization");
    return response;
  },
  async update(course) {
    const response = await connection("course")
      .where({ id: course.id })
      .andWhere({ is_deleted: false })
      .update(course);
    return response;
  },
  async delete(id) {
    const response = await connection("course")
      .where({ id })
      .update({ is_deleted: true });
    return response;
  },
};
