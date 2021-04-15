const answerModel = require("../models/AnswerModel");

module.exports = {
  async create(request, response) {
    try {
      const answer = request.body;
      await answerModel.create(answer);
      response.status(200).json("Resposta recebida com sucesso.");
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async read(request, response) {
    try {
      const filters = request.query;
      const result = await answerModel.read(filters);

      return response.status(200).json(result);
    } catch (error) {
      console.warn(error);
      response.status(500).json("Internal server error");
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      const foundExam = await answerModel.getById(id);

      if (!foundExam) {
        throw new Error("Resposta não encontrada.");
      } else {
        await answerModel.delete(id);
        response.status(200).json("Resposta deletada com sucesso.");
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const answer = await answerModel.getById(id);

      return response.status(200).json(answer);
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },
  
  async update(request, response) {
    try {
      const { id } = request.params;
      const answer = request.body;

      const res = await answerModel.update(answer, id);
      if (res !== 1) {
        return response.status(400).json("Resposta não encontrada!");
      } else {
        return response.status(200).json("Resposta alterada com sucesso ");
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },
};
