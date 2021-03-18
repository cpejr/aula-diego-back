const LessonModel = require("../models/LessonModel");
const lessonModel = require("../models/LessonModel");

module.exports = {
  async create(request, response) {
    try {
      const lesson = request.body;
      const id = await lessonModel.create(lesson);

      response.status(200).json("Aula criada com sucesso.");
      return id;
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      const foundlesson = await lessonModel.getById(id);

      if (!foundlesson) {
        throw new Error("Aula não encontrada.");
      } else {
        await lessonModel.delete(id);
        response.status(200).json("Aula deletada com sucesso.");
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async read(request, response) {
    try {
      const filters = request.query;
      const result = await LessonModel.read(filters);
      response.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;

      const lesson = await LessonModel.getById(id);
      return response.status(200).json(lesson);
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("internal server error");
    }
  },

  async update(request, response) {
    try {
      const { id } = request.params;
      const newLesson = request.body;

      newLesson.updated_at = datetime.getTime();

      const res = await lessonModel.updatelesson(lesson_id, newLesson);
      if (res !== 1) {
        return response.status(400).json("Aula não encontrada!");
      } else {
        return response.status(200).json("Aula alterada com sucesso ");
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },
};
