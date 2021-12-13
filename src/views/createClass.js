const classModel = require("../models/ClassModel");
const userClassModel = require("../models/UserClassModel");

module.exports = {
  async createClass(request, response) {
    try {
      const classId = await classModel.create({
        name: request.body.name,
        description: request.body.description,
        organization_id: request.body.organization_id,
        course_id: request.body.course_id,
      });

      for await (student of request.body.students) {
        await userClassModel.create({
          user_id: student,
          class_id: classId[0],
        });
      }

      response.status(200).json("Turma criada com sucesso!");
    } catch (error) {
      console.error(error.message);
      response.status(500).json("Internal server error.");
    }
  },
};
