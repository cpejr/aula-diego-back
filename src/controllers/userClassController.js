const UserClassModel = require("../models/UserClassModel");

module.exports = {
  async create(request, response) {
    try {
      const userClass = request.body; //user_id + class_id

      const result = await UserClassModel.create(userClass);
      return response
        .status(200)
        .json("Alunno adicionado à turma com succeso!");
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("internal server error");
    }
  },

  async read(request, response) {
    try {
      const filters = request.query;
      const result = UserClassModel.read(filters);
      return response.status(200).json(result);
    } catch (error) {
      console.warn(error);
      response.status(500).json("internal server error");
    }
  },

  async delete(request, response) {
    try {
      const { filters } = request.query;

      const result = await UserClassModel.delete(filters);
      response.status(200).json("Aluno removido da turma com sucesso!");
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("internal server error ");
    }
  },
};
