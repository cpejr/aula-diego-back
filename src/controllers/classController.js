const ClassModel = require("../models/ClassModel");
const UserClassModel = require("../models/UserClassModel");
const { v4: uuidv4 } = require("uuid");
// como classe é uma palavra reservada, usaremos turma
module.exports = {
  async create(request, response) {
    try {
      const turma = request.body;

      const result = await ClassModel.create(turma);
      return response
        .status(200)
        .json({ message: "Turma criada com succeso!" });
    } catch (error) {
      console.warn(error.message);
      response.status(500).json({ message: "Internal server error." });
    }
  },

  async read(request, response) {
    try {
      const filters = request.query;

      const result = await ClassModel.read(filters);
      return response.status(200).json(result);
    } catch (error) {
      console.warn(error);
      response.status(500).json({ message: "Internal server error." });
    }
  },

  async getAll(request, response) {
    try {
      const result = await ClassModel.getAll();
      return response.status(200).json(result);
    } catch (error) {
      console.warn(error);
      response.status(500).json({ message: "Internal server error." });
    }
  },

  async getStudents(request, response) {
    try {
      const result = await ClassModel.getStudents(request.params.id);
      return response.status(200).json(result);
    } catch (error) {
      console.warn(error);
      response.status(500).json({ message: "Internal server error." });
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;

      const turma = await ClassModel.getById(id);
      return response.status(200).json(turma);
    } catch (error) {
      console.warn(error.message);
      response.status(500).json({ message: "Internal server error." });
    }
  },
  async update(request, response) {
    try {
      const turma = request.body;
      const loggedUser = request.session;

      if (
        !(
          (loggedUser.organization == turma.organization &&
            loggedUser.type != "student") ||
          loggedUser.type == "master"
        )
      )
        return response
          .status(403)
          .json({
            message: "Você não tem permissão para realizar esta operação",
          });

      const res = await ClassModel.update({
        id: request.body.id,
        name: request.body.name,
        description: request.body.description,
        organization_id: request.body.organization_id,
        course_id: request.body.course_id,
      });

      // await UserClassModel.update(request.body.students);
      let classStudents = [];
      for await (student of request.body.students) {
        classStudents.push({
          user_id: student,
          class_id: request.body.id,
        });
        // await UserClassModel.update({user_id: student, class_id: request.body.id})
      }
      await UserClassModel.update(classStudents);

      if (res !== 1) {
        return response.status(404).json({ message: "Turma não encontrada!" });
      } else {
        return response
          .status(200)
          .json({ message: "Turma alterada com sucesso" });
      }
    } catch (error) {
      console.log(error.message);
      return response.status(500).json({ message: "Internal server error." });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      const result = await ClassModel.delete(id);
      response.status(200).json({ message: "Turma apagada com sucesso!" });
    } catch (error) {
      console.warn(error.message);
      response.status(500).json({ message: "Internal server error." });
    }
  },
};
