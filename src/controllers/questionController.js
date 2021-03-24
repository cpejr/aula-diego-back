const { create, getById } = require("../models/QuestionModel");
const QuestionModel = require("../models/QuestionModel");

module.exports = {
  async create(req, res) {
    const data = req.body;

    try {
      await QuestionModel.create(data);

      res.status(200).json(data);
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("Internal server error");
    }
  },
  async getById(req, res) {
    const { id } = req.params;

    try {
      const question = await QuestionModel.getById(id);

      res.status(200).json(question);
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("Internal server error");
    }
  },
  async read(req, res) {
    const filters = req.params;

    try {
      const questions = await QuestionModel.read(filters);

      res.status(200).json(questions);
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("Internal server error");
    }
  },
  async update(req, res) {
    const question = req.body;

    try {
      const result = await QuestionModel.update(question);

      res.status(200).json(result);
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("Internal server error");
    }
  },
  async delete(req, res) {
    const { id } = req.params;

    try {
      const result = await QuestionModel.delete(id);

      res.status(200).json(result);
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("Internal server error");
    }
  },
};
