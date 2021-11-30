const FileLessonModel = require("../models/FileLessonModel");
const LessonModel = require("../models/LessonModel");
const videoLessonModel = require("../models/videoLessonModel");

module.exports = {
  async create(request, response) {
    try {
      const { name, description, text, course_id, file_ids, videos } =
        request.body;
      const id = await LessonModel.create({
        name,
        description,
        text,
        course_id,
      });

      videos.forEach(async (video) => {
        await videoLessonModel.create({ video_url: video, lesson_id: id[0] });
      });

      file_ids.forEach(async (file_id) => {
        await FileLessonModel.create({ file_id, lesson_id: id[0] });
      });

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

      const res = await LessonModel.update(newLesson, id);
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
