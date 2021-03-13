const FileModel = require("../models/FileModel");
const path = require("path")

module.exports = {
  async create(request, response) {
    try {
      const file = request.body;
      await FileModel.create(file);
      response.status(200).json("Arquivo criado com sucesso.");
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
      const filters = request.params;
      const result = await FileModel.read(filters);
      response.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async getFile(request, response) {
    try {
      const { id } = request.params;
      const file = await FileModel.getById(id);
      
      response.sendFile(path.join(__dirname, ".." , "images", file[0].path));
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
