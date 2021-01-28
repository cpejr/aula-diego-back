const ClassModel = require("../models/ClassModel");

module.exports = {
  async create(request, response) {
    try {
      const turma = {
        comapny: request.body.company,
        name: request.body.name,
        description: request.body.description,
        code: request.body.code,
        occupation: request.body.occupation,
      };
      await ClassModel.create(turma);
      response.status(200).json("Turma criada com sucesso.");
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async getById(request, response) {
    try {
      const { class_id } = request.params;
      const result = await ClassModel.getById(class_id);
      return response.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async getAllByCompany(request, response) {
    try {
      const { company } = request.params;
      const result = await ClassModel.getAllByCompany(company);
      return response.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async update(request, response) {
    try {
      const { class_id } = request.params;
      const newClass = request.body;
      const res = await ClassModel.update(class_id, newClass);

      if (res !== 1) {
        return response.status(400).json("Turma não encontrada!");
      } else {
        return response.status(200).json("Turma alterada com sucesso ");
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async delete(request, response) {
    try {
      const { class_id } = request.params;
      const foundClass = await ClassModel.getById(class_id);
      if (!foundClass) {
        throw new Error("Turma não encontrada.");
      } else {
        await ClassModel.delete(class_id);
        response.status(200).json("Turma deletada com sucesso.");
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },
};
