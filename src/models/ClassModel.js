const connection = require("../database/connection");

module.exports = {
  //foi colocado turma porque class é um nome reservado
  async create(turma) {
    const response = await connection("class").insert(turma);
    return response;
  },

  async getById(id) {
    const response = await connection("class")
      .where({ id })
      .select("*")
      .first();
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
