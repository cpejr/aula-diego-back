const lessonModel = require("../models/LessonModel");
const fileModel = require("../models/FileModel");
const fileLessonModel = require("../models/FileLessonModel");

module.exports = {
  async createLesson(request, response) {
    try {
      const data = request.body;

      let fileIds = [];

      const lesson = {
        name: data.name,
        description: data.description,
        course_id: data.course_id,
      };

      const lessonId = await lessonModel.create(lesson);
      for await (let filename of data.file_names) {
        const fileName = filename.match(/.+(?=\.)/)[0];
        const fileExt = filename.match(/(?<=\.).+/)[0];

        const file = {
          name: fileName,
          type: fileExt,
          path: `${fileName}.${fileExt}`,
          user_id: data.user_id
        };

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
  }
};
