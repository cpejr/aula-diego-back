const CourseModel = require("../models/CourseModel");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async create(request, response) {
    try {
      const course = request.body;

      const result = await CourseModel.create(course);
      return response
        .status(200)
        .json({ message: "Curso criado com succeso!" });
    } catch (error) {
      console.warn(error.message);
      response.status(500).json({ message: "Internal server error." });
    }
  },

  async read(request, response) {
    try {
      const filters = request.query;
      const result = await CourseModel.read(filters);
      return response.status(200).json(result);
    } catch (error) {
      console.warn(error);
      response.status(500).json({ message: "Internal server error." });
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const course = await CourseModel.getById(id);
      return response.status(200).json(course);
    } catch (error) {
      console.warn(error.message);
      response.status(500).json({ message: "Internal server error." });
    }
  },
  async getByIdAll(request, response) {
    try {
      const { id } = request.params;
      const course = await CourseModel.getById(id);
      const content = await CourseModel.getByIdAll(id);
      if (!course.is_deleted) {
        const entries = content.map((item) => ({
          ...item,
          course_name: course.name,
        }));
        return response.status(200).json(entries);
      }
      response.status(200).json([]);
    } catch (error) {
      console.warn(error.message);
      response.status(500).json({ message: "Internal server error." });
    }
  },
  async getByUserId(request, response) {
    try {
      const { user_id } = request.params;
      const courses = await CourseModel.getByUserId(user_id);
      return response.status(200).json(courses);
    } catch (error) {
      console.warn(error.message);
      response.status(500).json({ message: "Internal server error." });
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
          .json({
            message: "Você não tem permissão para realizar esta operação",
          });

      const res = await CourseModel.update(course);

      if (res !== 1) {
        return response.status(404).json({ message: "Curso não encontrado!" });
      } else {
        return response
          .status(200)
          .json({ message: "Curso alterado com sucesso" });
      }
    } catch (error) {
      console.log(error.message);
      return response.status(500).json({ message: "Internal server error." });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      await CourseModel.delete(id);
      response.status(200).json({ message: "Curso apagado com sucesso!" });
    } catch (error) {
      console.warn(error.message);
      response.status(500).json({ message: "Internal server error." });
    }
  },
};
