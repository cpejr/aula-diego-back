const OccupationModel = require("../models/OccupationModel");
const OrganizationModel = require("../models/OrganizationModel");

module.exports = {
  async create(request, response) {
    try {
      const occupation = request.body;
      const result = await OccupationModel.create(occupation);
      return response
        .status(200)
        .json({ message: "Ocupação criada com succeso!" });
    } catch (error) {
      console.warn(error.message);
      response.status(500).json({ message: "Internal server error." });
    }
  },

  async read(request, response) {
    try {
      const filters = request.query;
      const result = await OccupationModel.read(filters);
      return response.status(200).json(result);
    } catch (error) {
      console.warn(error);
      response.status(500).json({ message: "Internal server error." });
    }
  },

  async getAll(request, response) {
    try {
      const result = await OccupationModel.getAll();
      return response.status(200).json(result);
    } catch (error) {
      console.warn(error);
      response.status(500).json({ message: "Internal server error." });
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const occupation = await OccupationModel.getById(id);
      return response.status(200).json(occupation);
    } catch (error) {
      console.warn(error.message);
      response.status(500).json({ message: "Internal server error." });
    }
  },
  async update(request, response) {
    try {
      const occupation = request.body;
      const loggedUser = request.session;

      if (
        !(
          (loggedUser.organization == occupation.organization &&
            loggedUser.type != "student") ||
          loggedUser.type == "master"
        )
      )
        return response.status(403).json({
          message: "Você não tem permissão para realizar esta operação",
        });

      const res = await OccupationModel.update(occupation);

      if (res !== 1) {
        return response
          .status(404)
          .json({ message: "Ocupação não encontrada!" });
      } else {
        return response
          .status(200)
          .json({ message: "Ocupação alterada com sucesso" });
      }
    } catch (error) {
      console.error(error.message);
      return response.status(500).json({ message: "Internal server error." });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;

      await OccupationModel.delete(id);
      response.status(200).json({ message: "Ocupação apagada com sucesso!" });
    } catch (error) {
      console.warn(error.message);
      response.status(500).json({ message: "Internal server error." });
    }
  },
};
