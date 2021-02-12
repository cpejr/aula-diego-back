const OccupationModel = require("../models/OccupationModel");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async create(request, response) {
    try {
      const occupation = request.body;

      const response = await OccupationModel.create(occupation);
      return response.status(200).json("Ocupação criada com succeso!");
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("internal server error");
    }
  },

  async read(request, response) {
    try {
      const filters = request.query;
      const result = OccupationModel.read(filters);
      return response.status(200).json(result);
    } catch (error) {
      console.warn(error);
      response.status(500).json("internal server error");
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const occupation = await OccupationModel.getById(id);
      return response.status(200).json(occupation);
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("internal server error");
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
        return response
          .status(403)
          .json("Você não tem permissão para realizar esta operação");

      const res = await OccupationModel.update(occupation);

      if (res !== 1) {
        return response.status(404).json("Ocupação não encontrada!");
      } else {
        return response.status(200).json("Ocupação alterada com sucesso ");
      }
    } catch (error) {
      console.log(error.message);
      return response.status(500).json("internal server error ");
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;

      const result = await OccupationModel.delete(id);
      response.status(200).json("Ocupação apagada com sucesso!");
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("internal server error ");
    }
  },
};
