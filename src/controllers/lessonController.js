const { update } = require("../database/connection");
const lessonModel = require("../models/lessonModel");

module.exports = {
  async create(request, response) {
    try {
      const lesson = request.body;

      await lessonModel.createNewlesson(lesson);
      response.status(200).json("Aula criada com sucesso.");
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
        await lessonModel.deletelesson(id);
        response.status(200).json("Aula deletada com sucesso.");
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async read(request, response) {
    try {
      const { id } = request.params;
      const lesson = await lessonModel.getById(id);
      const allowed = await ClassModel.getUsersInClass(id);
      const user = request.session.user;

      for (let student in allowed) {
        if (user.user_id === student.user_id)
          return response.status(200).json(lesson);
      }

      return response.status(500).json("Unauthorized");
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
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
