const LessonPresenceModel = require("../models/LessonPresenceModel");

module.exports = {
  async createUser(request, response) {
    try {
      const lessonPresence = request.body;

      const response = await LessonPresenceModel.create(lessonPresence);
      return response.status(200).json("Presença em lição criada com succeso!");
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("internal server error");
    }
  },

  async read(request, response) {
    try {
      const filters = request.query;
      const result = LessonPresenceModel.read(filters);
      return response.status(200).json(result);
    } catch (error) {
      console.warn(error);
      response.status(500).json("internal server error");
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const lessonPresence = await LessonPresenceModel.getById(id);
      return response.status(200).json(lessonPresence);
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("internal server error");
    }
  },
  async update(request, response) {
    try {
      const lessonPresence = request.body;
      const loggedUser = request.session;

      if (loggedUser.id != lessonPresence.user && loggedUser.type != "master")
        return response
          .status(403)
          .json("Você não tem permissão para realizar esta operação");

      const res = await LessonPresenceModel.update(lessonPresence);

      if (res !== 1) {
        return response.status(404).json("Presença em lição não encontrada!");
      } else {
        return response
          .status(200)
          .json("Presença em lição alterada com sucesso ");
      }
    } catch (error) {
      console.log(error.message);
      return response.status(500).json("internal server error ");
    }
  },

  async delete(request, response) {
    try {
      const { filters } = request.query;

      const result = await LessonPresenceModel.delete(filters);
      response.status(200).json("Presença em lição apagada com sucesso!");
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("internal server error ");
    }
  },
};