const FileModel = require("../models/FileModel");
const multer = require("../middlewares/multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

module.exports = {
  async create(request, response) {
    try {
      const data = request.body;
      const fileType = data.file_type.match(/.+(?=\/)/)[0];
      const fileExtension = data.file_original.match(/(?<=\.).+/)[0];
      const file_id = uuidv4();

      if (fileType !== "image") {
        console.warn("Not a image");
        response.status(500).json("Internal server error");
      }

      const image = {
        id: file_id,
        name: data.file_name,
        type: fileExtension,
        path: `${file_id}.${fileExtension}`,
        user_id: data.user_id,
      };

      await FileModel.create(image);
      response.status(200).json({ file_id: file_id });
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async uploadFile(request, response, next) {
    multer.upload(request, response, next);
    response.status(200).json("Arquivo enviado com sucesso.");
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

      response.sendFile(path.join(__dirname, "..", "images", file[0].path));
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
