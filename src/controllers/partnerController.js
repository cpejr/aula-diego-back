const PartnerModel = require("../models/PartnerModel");
const { v4: uuidv4 } = require("uuid");
//como classe é uma palavra reservada, usaremos partner
module.exports = {
  async create(request, response) {
    try {
      const partner = request.body;

      const result = await PartnerModel.create(partner);
      return response.status(200).json("Parceiro criada com succeso!");
    } 
    catch (error) {
      console.warn(error.message);
      response.status(500).json("Internal server error");
    }
  },

  async read(request, response) {
    try {
      const filters = request.query;

      const result = await PartnerModel.read({ ...filters });
      return response.status(200).json(result);
    } 
    catch (error) {
      console.warn(error);
      response.status(500).json("Internal server error");
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;

      const partner = await PartnerModel.getById(id);
      return response.status(200).json(partner);
    } 
    catch (error) {
      console.warn(error.message);
      response.status(500).json("Internal server error");
    }
  },

  async update(request, response) {
    try {
      const partner = request.body;
      const res = await PartnerModel.update(partner);

      if (res !== 1) {
        return response.status(404).json("Parceiro não encontrado!");
      } else {
        return response.status(200).json("Parceiro alterado com sucesso ");
      }
    } 
    catch (error) {
      console.log(error.message);
      return response.status(500).json("Internal server error ");
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      const result = await PartnerModel.delete(id);

      if (response === 0) {
        return response.status(404).json("Parceiro não encontrada!");
      } else {
        return response.status(200).json("Parceiro deletado com sucesso ");
      }
    } 
    catch (error) {
      console.warn(error.message);
      response.status(500).json("Internal server error ");
    }
  },
};
