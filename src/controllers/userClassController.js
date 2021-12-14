const UserClassModel = require("../models/UserClassModel");

module.exports = {
  async create(request, response) {
    try {
      const userClass = request.body; //user_id + class_id

      await UserClassModel.create(userClass);
      return response
        .status(200)
        .json({ message: "Aluno adicionado à turma com succeso!" });
    } catch (error) {
      console.warn(error.message);
      response.status(500).json({ message: "Internal server error." });
    }
  },

  async read(request, response) {
    try {
      const filters = request.query;
      const result = await UserClassModel.read(filters);
      if (!result || result.length == 0)
        return response
          .status(404)
          .json({ message: "Relation user class not found" });
      return response.status(200).json(result);
    } catch (error) {
      console.warn(error);
      response.status(500).json({ message: "Internal server error." });
    }
  },

  async delete(request, response) {
    try {
      await UserClassModel.delete(
        request.params.class_id,
        request.params.user_id
      );
      response
        .status(200)
        .json({ message: "Aluno removido da turma com sucesso!" });
    } catch (error) {
      console.warn(error.message);
      response.status(500).json({ message: "Internal server error." });
    }
  },
};
