const LivePresenceModel = require("../models/LivePresenceModel");

module.exports = {
  async create(request, response) {
    try {
      const livePresence = request.body; //user_id + live_id

      const response = await LivePresenceModel.create(livePresence);
      return response.status(200).json("Presença em live criada com succeso!");
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("internal server error");
    }
  },

  async read(request, response) {
    try {
      const filters = request.query;
      const result = LivePresenceModel.read(filters);
      return response.status(200).json(result);
    } catch (error) {
      console.warn(error);
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

      const res = await LivePresenceModel.update(lessonPresence);

      if (res !== 1) {
        return response.status(404).json("Presença em live não encontrada!");
      } else {
        return response
          .status(200)
          .json("Presença em live alterada com sucesso ");
      }
    } catch (error) {
      console.log(error.message);
      return response.status(500).json("internal server error ");
    }
  },

  async delete(request, response) {
    try {
      const { filters } = request.query;

      const result = await LivePresenceModel.delete(filters);
      response.status(200).json("Presença em live apagada com sucesso!");
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("internal server error ");
    }
  },
};
