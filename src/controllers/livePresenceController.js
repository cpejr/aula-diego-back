const LivePresenceModel = require("../models/LivePresenceModel");
const LiveModel = require("../models/LiveModel");
const CourseModel = require("../models/CourseModel");
const connection = require("../database/connection");
const UserModel = require("../models/UserModel");

module.exports = {
  async create(request, response) {
    try {
      const livePresence = request.body; //user_id + live_id + confirmation_code
      const loggedUser = request.session.user;

      if (loggedUser.id != livePresence.user_id) {
        return response.status(403).json({
          message: "Você não tem permissão para realizar esta operação",
        });
      }

      const alreadyExists = await LivePresenceModel.read({
        user_id: livePresence.user_id,
        live_id: livePresence.live_id,
      });
      if (alreadyExists.length >= 1)
        return response
          .status(409)
          .json({ message: "Presença já cadastrada!" });

      const live = await LiveModel.getById(livePresence.live_id);
      if (live.confirmation_code != livePresence.confirmation_code)
        return response
          .status(400)
          .json({ message: "Código de verificação inválido" });

      delete livePresence.confirmation_code;

      const result = await LivePresenceModel.create({
        ...livePresence,
        confirmation: true,
      });

      // gamification related:
      const user = await UserModel.getById(livePresence.user_id);
      await UserModel.update({
        id: livePresence.user_id,
        score: user.score + 1,
      });

      return response
        .status(200)
        .json({ message: "Presença em live criada com succeso!" });
    } catch (error) {
      console.warn(error.message);
      response.status(500).json({ message: "Internal server error." });
    }
  },

  async read(request, response) {
    try {
      const filters = request.query;
      const result = await LivePresenceModel.read(filters);
      return response.status(200).json(result);
    } catch (error) {
      console.warn(error);
      return response.status(500).json({ message: "Internal server error." });
    }
  },

  async getAudience(request, response) {
    try {
      const filters = request.query;
      const result = await LivePresenceModel.getAudience(filters);
      return response.status(200).json(result);
    } catch (error) {
      console.error(error.message);
      response.status(500).json({ message: "Internal server error." });
    }
  },

  async update(request, response) {
    try {
      const livePresence = request.body;
      const loggedUser = request.session;

      if (loggedUser.id != livePresence.user_id && loggedUser.type != "master")
        return response.status(403).json({
          message: "Você não tem permissão para realizar esta operação",
        });

      const res = await LivePresenceModel.update(livePresence);

      if (res !== 1) {
        return response
          .status(404)
          .json({ message: "Presença em live não encontrada!" });
      } else {
        return response
          .status(200)
          .json({ message: "Presença em live alterada com sucesso" });
      }
    } catch (error) {
      console.warn(error.message);
      return response.status(500).json({ message: "Internal server error." });
    }
  },

  async delete(request, response) {
    try {
      const { filters } = request.query;

      const result = await LivePresenceModel.delete(filters);
      response
        .status(200)
        .json({ message: "Presença em live apagada com sucesso!" });
    } catch (error) {
      console.warn(error.message);
      response.status(500).json({ message: "Internal server error." });
    }
  },
};
