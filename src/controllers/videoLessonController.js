const VideoLessonModel = require("../models/videoLessonModel");

module.exports = {
  async create(request, response) {
    try {
      const videoLesson = request.body;
      const response = await videoLessonModel.create(videoLesson);

      return response
        .status(200)
        .json({ message: "Vídeo adicionado à aula com succeso!" });
    } catch (error) {
      console.warn(error.message);
      response.status(500).json({ message: "Internal server error." });
    }
  },

  async read(request, response) {
    try {
      const filters = request.query;
      const result = await VideoLessonModel.read(filters);

      return response.status(200).json(result);
    } catch (error) {
      console.warn(error);
      response.status(500).json({ message: "Internal server error." });
    }
  },

  async delete(request, response) {
    try {
      const { filters } = request.query;
      await VideoLessonModel.delete(filters);

      response
        .status(200)
        .json({ message: "Video removido da aula com sucesso!" });
    } catch (error) {
      console.warn(error.message);
      response.status(500).json({ message: "Internal server error." });
    }
  },
};
