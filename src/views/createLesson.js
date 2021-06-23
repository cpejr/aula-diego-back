const lessonModel = require("../models/LessonModel");
const fileModel = require("../models/FileModel");
const fileLessonModel = require("../models/FileLessonModel");
const videoLessonModel = require("../models/videoLessonModel");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async createLesson(request, response) {
    try {
      const data = request.body;

      let fileIds = [];

      const lesson = {
        name: data.name,
        description: data.description,
        text: data.text,
        course_id: data.course_id,
      };

      const lessonId = (await lessonModel.create(lesson))[0];

      console.log(lessonId);

      for await (let video of data.videos) {
        const videoLesson = {
          lesson_id: lessonId,
          video_url: video,
        };

        await videoLessonModel.create(videoLesson);
      }

      for await (let filename of data.file_names) {
        const fileName = filename.match(/.+(?=\.)/)[0];
        const fileExt = filename.match(/(?<=\.).+/)[0];
        const fileId = uuidv4();

        const file = {
          id: fileId,
          name: fileName,
          type: fileExt,
          path: `${fileId}.${fileExt}`,
          user_id: data.user_id,
        };

        await fileModel.create(file);

        const fileLesson = {
          lesson_id: lessonId[0],
          file_id: fileId,
        };

        await fileLessonModel.create(fileLesson);
        fileIds.push(fileId);
      }

      response.status(200).json(fileIds);
    } catch (error) {
      console.warn(error);
      response.status(500).json("Internal server error.");
    }
  },
};
