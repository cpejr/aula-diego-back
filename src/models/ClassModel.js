const { object } = require("joi");
const connection = require("../database/connection");

module.exports = {
  //foi colocado turma porque class é um nome reservado
  async create(turma) {
    const response = await connection("class").insert(turma, "id");
    return response;
  },

  async getAll() {
    const response = await connection("class")
      .join("course", "class.course_id", "course.id")
      .where({ "class.is_deleted": false, "course.is_deleted": false })
      .select(
        "class.*", 
        "course.name as course_name"
      );
    return response;
  },

  async getById(id) {
    const response = await connection("class")
      .where({ id })
      .select("*")
      .first();
    return response;
  },

  async getStudents(id) {
    const response = await connection("class")
      .join("user_class", "class.id", "user_class.class_id")
      .join("user", "user_class.user_id", "user.id")
      .join("organization", "user.organization_id", "organization.id")
      .join("occupation", "user.occupation_id", "occupation.id")
      .where({
        "class.is_deleted": false, 
        "user.is_deleted": false,
        "class.id": id
      })
      .select(
        "user.id as id",
        "class.id as class_id",
        "user.name as name",
        "user.registration as registration",
        "organization.name as organization",
        "occupation.name as occupation"
      );

    return response;
  },

  async read(filters) {
    const response = await connection("class")
      .where(filters)
      .andWhere({ is_deleted: false })
      .select("*");
    return response;
  },

  async update(turma) {
    const response = await connection("class")
      .where({ id: turma.id })
      .update(turma);
    return response;
  },

  async delete(id) {
    const response = await connection("class")
      .where({ id })
      .update({ is_deleted: true });
    return response;
  },
};
