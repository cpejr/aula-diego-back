const connection = require("../database/connection");

module.exports = {
  async create(VideoLesson) {
    const response = await connection("video_lesson").insert(VideoLesson);
    return response;
  },
  async read(filters) {
    const response = await connection("video_lesson")
      .where(filters);

    return response;
  },
  async update(VideoLesson) {
    const response = await connection("video_lesson")
      .where({ id: VideoLesson.id })
      .update(VideoLesson);
    return response;
  },
  async delete(id) {
    const response = await connection("video_lesson").where({ id }).delete();
    return response;
  },
};
