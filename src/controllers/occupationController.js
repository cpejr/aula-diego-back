const { update } = require("../database/connection");
const OccupationModel = require("../models/OccupationModel");

module.exports = {
  async create(request, response) {
    try {
      const occupation = {
        name: request.body.name,
        description: request.body.description,
      };
      await OccupationModel.create(occupation);
      response.status(200).json("Ocupação criada com sucesso.");
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const result = await OccupationModel.getById(id);
      return response.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async getAllByOrganization(request, response) {
    try {
      const { organization } = request.params;
      const result = await OccupationModel.getAllByOrganization(organization);
      return response.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async update(request, response) {
    try {
      const { id } = request.params;
      const newOccupation = request.body;
      const res = await OccupationModel.update(id, newOccupation);

      if (res !== 1) {
        return response.status(400).json("Ocupação não encontrada!");
      } else {
        return response.status(200).json("Ocupação alterada com sucesso ");
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      const foundOccupation = await OccupationModel.getById(id);
      if (!foundOccupation) {
        throw new Error("Ocupação não encontrada.");
      } else {
        await OccupationModel.delete(id);
        response.status(200).json("Ocupação deletada com sucesso.");
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },
};
