const LessonPresenceModel = require("../models/LessonPresenceModel");
const LivePresenceModel = require("../models/LivePresenceModel");
const UserModel = require("../models/UserModel");

module.exports = {
  async create(request, response) {
    try {
      const lessonPresence = request.body;

      const response = await LessonPresenceModel.create(lessonPresence);

      // gamification related:
      const user = await UserModel.getById(lessonPresence.user_id);
      await UserModel.update(lessonPresence.user_id, { score: user.score + 1 });

      return response
        .status(200)
        .json({ message: "Presença em lição criada com succeso!" });
    } catch (error) {
      console.warn(error.message);
      response.status(500).json({ message: "Internal server error." });
    }
  },

  async read(request, response) {
    try {
      const filters = request.query;
      const result = LessonPresenceModel.read(filters);
      return response.status(200).json(result);
    } catch (error) {
      console.warn(error);
      response.status(500).json({ message: "Internal server error." });
    }
  },

  async update(request, response) {
    try {
      const lessonPresence = request.body;
      const loggedUser = request.session;

      if (loggedUser.id != lessonPresence.user && loggedUser.type != "master")
        return response.status(403).json({
          message: "Você não tem permissão para realizar esta operação",
        });

      const res = await LessonPresenceModel.update(lessonPresence);

      if (res !== 1) {
        return response
          .status(404)
          .json({ message: "Presença em lição não encontrada!" });
      } else {
        return response
          .status(200)
          .json({ message: "Presença em lição alterada com sucesso" });
      }
    } catch (error) {
      console.error(error.message);
      return response.status(500).json({ message: "Internal server error." });
    }
  },

  async delete(request, response) {
    try {
      const { filters } = request.query;

      const result = await LessonPresenceModel.delete(filters);
      response
        .status(200)
        .json({ message: "Presença em lição apagada com sucesso!" });
    } catch (error) {
      console.warn(error.message);
      response.status(500).json({ message: "Internal server error." });
    }
  },
};
