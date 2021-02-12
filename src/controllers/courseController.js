const CourseModel = require("../models/CourseModel");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async create(request, response) {
    try {
      const course = request.body;
      course.id = uuidv4();
      course.created_at = new Date().getTime(); //Preciso fazer?
      course.updated_at = new Date().getTime(); //Preciso fazer?
      course.is_deleted = false;

      const response = await CourseModel.create(course);
      return response.status(200).json("Curso criado com succeso!");
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("internal server error");
    }
  },

  async read(request, response) {
    try {
      const filters = request.query;
      const result = CourseModel.read(filters);
      return response.status(200).json(result);
    } catch (error) {
      console.warn(error);
      response.status(500).json("internal server error");
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const course = await CourseModel.getById(id);
      return response.status(200).json(course);
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("internal server error");
    }
  },
  async update(request, response) {
    try {
      const course = request.body;
      const loggedUser = request.session;

      if (
        !(
          (loggedUser.organization == course.organization &&
            loggedUser.type != "student") ||
          loggedUser.type == "master"
        )
      )
        return response
          .status(403)
          .json("Você não tem permissão para realizar esta operação");

      const res = await CourseModel.update(course);

      if (res !== 1) {
        return response.status(404).json("Curso não encontrado!");
      } else {
        return response.status(200).json("Curso alterado com sucesso ");
      }
    } catch (error) {
      console.log(error.message);
      return response.status(500).json("internal server error ");
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;

      const result = await CourseModel.delete(id);
      response.status(200).json("Curso apagado com sucesso!");
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("internal server error ");
    }
  },
};
