const examModel = require("../models/ExamModel");

module.exports = {
  async create(request, response) {
    try {
      const exam = request.body;
      await examModel.create(exam);
      response.status(200).json("Prova criada com sucesso.");
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async read(request, response) {
    try {
      const filters = request.query;
      const result = await examModel.read(filters);

      return response.status(200).json(result);
    } catch (error) {
      console.warn(error);
      response.status(500).json("internal server error");
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      const foundExam = await examModel.getById(id);

      if (!foundExam) {
        throw new Error("Prova não encontrada.");
      } else {
        await examModel.delete(id);
        response.status(200).json("Prova deletada com sucesso.");
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const exam = await examModel.getById(id);

      return response.status(200).json(exam);
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },
  async update(request, response) {
    try {
      const { id } = request.params;
      const exam = request.body;

      const res = await examModel.update(exam, id);
      if (res !== 1) {
        return response.status(400).json("Prova não encontrada!");
      } else {
        return response.status(200).json("Prova alterada com sucesso ");
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },
};
