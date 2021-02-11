const FileLessonModel = require("../models/FileLessonModel");

module.exports = {
  async create(request, response) {
    try {
      const fileLesson = request.body; //file_id + lesson_id

      const response = await FileLessonModel.create(fileLesson);
      return response
        .status(200)
        .json("Arquivo adicionado à aula com succeso!");
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("internal server error");
    }
  },

  async read(request, response) {
    try {
      const filters = request.query;
      const result = FileLessonModel.read(filters);
      return response.status(200).json(result);
    } catch (error) {
      console.warn(error);
      response.status(500).json("internal server error");
    }
  },

  async delete(request, response) {
    try {
      const { filters } = request.query;

      const result = await FileLessonModel.delete(filters);
      response.status(200).json("Arquivo removido da aula com sucesso!");
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("internal server error ");
    }
  },
};
