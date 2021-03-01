const lessonModel = require("../models/LessonModel");
const fileModel = require("../models/FileModel");
const fileLessonModel = require("../models/FileLessonModel");
const multer = require("../middlewares/multer");

module.exports = {
  async createLesson(request, response) {
    try {
      const data = request.body;
      const files = request.body.files;
      let fileIds = [];

      const lesson = {
        name: data.name,
        description: data.description,
        course_id: data.course_id,
      };

      const file = {
        user_id: data.user_id,
        path: "waiting",
      };

      const lessonId = await lessonModel.create(lesson);

      for await (let upload of files) {
        const fileId = await fileModel.create(file);
        const fileLesson = {
          lesson_id: lessonId[0],
          file_id: fileId[0],
        };

        await fileLessonModel.create(fileLesson);
        fileIds.push(fileId);
      }
      
      response.status(200).json(fileIds);
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async uploadFile(request, response, next) {
    multer.upload(request, response, next);

    response.status(200).json("Arquivos enviado com sucesso.");
  },
};
