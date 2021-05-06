const connection = require("../database/connection");
const LessonModel = require("../models/LessonModel");

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
      const foundlesson = await LessonModel.getById(id);

      if (!foundlesson) {
        throw new Error("Aula não encontrada.");
      } else {
        await LessonModel.delete(id);
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
      // const result = await connection("lesson")
      // .join("file_lesson", "lesson.id", "file_lesson.lesson_id")
      // .where(filters)
      // .select("*")
      response.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;

      const lesson = await connection("lesson")
        .join("file_lesson", "lesson.id", "file_lesson.lesson_id")
        .join("file", "file.id", "file_lesson.file_id")
        .where({
          "lesson.is_deleted": false,
          "file.is_deleted": false,
          "lesson.id": id,
        })
        .select(
          "lesson.*",
          "file.name as file_name",
          "file.type as type",
          "file.id as file_id"
        )
        .first();
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

      const res = await lessonModel.update(newLesson, id);
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
