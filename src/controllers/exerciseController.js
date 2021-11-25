const exerciseModel = require("../models/ExerciseModel");

module.exports = {
  async create(request, response) {
    try {
      const {
        name,
        start_date,
        end_date,
        questions,
        course_id,
        open,
        evaluate,
      } = request.body;
      await exerciseModel.create({
        name,
        start_date,
        end_date,
        questions,
        course_id,
        open,
        evaluate,
      });
      response.status(200).json("Atividade criada com sucesso.");
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async read(request, response) {
    try {
      const filters = request.query;
      const result = await exerciseModel.read(filters);

      return response.status(200).json(result);
    } catch (error) {
      console.warn(error);
      response.status(500).json("internal server error");
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      const foundExam = await exerciseModel.getById(id);

      if (!foundExam) {
        throw new Error("Atividade não encontrada.");
      } else {
        await exerciseModel.delete(id);
        response.status(200).json("Atividade deletada com sucesso.");
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const exercise = await exerciseModel.getById(id);

      return response.status(200).json(exercise);
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async update(request, response) {
    try {
      const { id } = request.params;
      const {
        name,
        start_date,
        end_date,
        questions,
        course_id,
        open,
        evaluate,
      } = request.body;

      const exerc = await exerciseModel.getById(id);

      if (exerc.open === true)
        return response
          .status(400)
          .json("Provas abertas não podem ser alteradas!");

      const res = await exerciseModel.update(
        { name, start_date, end_date, questions, course_id, open, evaluate },
        id
      );
      if (res !== 1) {
        return response.status(400).json("Atividade não encontrada!");
      } else {
        return response.status(200).json("Atividade alterada com sucesso ");
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async close(request, response) {
    try {
      const { id } = request.params;
      const extend = { end_date: Date.now() / 1000.0 };

      const res = await exerciseModel.update(extend, id);

      if (res !== 1) {
        return response.status(400).json("Atividade não encontrada!");
      } else {
        return response.status(200).json("Atividade alterada com sucesso ");
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },
};
