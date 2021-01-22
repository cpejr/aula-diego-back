const { update } = require("../database/connection");
const { read } = require("../models/ClassAdminModel");
const ClassAdminModel = require("../models/ClassAdminModel");

module.exports = {
  async create(request, response) {
    try {
      const {class_id} = request.body;
      const {user_id} = request.session.user.user_id;
      await ClassAdminModel.create(class_id, user_id);
      response.status(200).json("Professor adcionado à turma com sucesso.");
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async read(request, response){
    const filters = request.query;
    try {
        const result = await ClassAdminModel.read(filters);
        return response.status(200).json(result);
      } catch (error) {
        console.log(error.message);
        response.status(500).json("Internal server error.");
      }
  },

  /*async getAllByAdmin(request, response) {
    try {
      const loggedUser = request.session.user;
      const user_id = request.params;
      if((loggedUser.user_id != user_id) && (loggedUser.type != 'master')) return(response.status(403).json("Id não correspondente ao usuário logado."));

      const result = await ClassAdminModel.getAllByAdmin(user_id);
      return response.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async getByClassAndAdmin(request, response) {
    try {
      const { class_id, user_id } = request.body;
      const loggedUser = request.session.user;
      if((loggedUser.user_id != user_id) && (loggedUser.type != 'master')) return(response.status(403).json("Id não correspondente ao usuário logado."));

      const result = await ClassAdminModel.getByClassAndAdmin(class_id, user_id);
      return response.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async getAllByClass(request, response) {
    try {
      const { class_id } = request.body;
      const result = await ClassAdminModel.getAllByClass(class_id);
      return response.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.body;
      const result = await ClassAdminModel.getById(id);
      return response.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },*/

  async delete(request, response) {
    try {
      const { id } = request.body;
      const result = await ClassAdminModel.delete(id);
      if (!result) {
        throw new Error("Vínculo classe/professor não encontrado.");
      } else {
        response.status(200).json("Classe desvinculada do professor!");
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async deleteByClassAndAdmin(request, response) {
    try {
      const { class_id } = request.body;
      const loggedUser = request.session.user;
      const user_id = request.params;
      if((loggedUser.user_id != user_id) && (loggedUser.type != 'master')) return(response.status(403).json("Id não correspondente ao usuário logado."));

      const result = await ClassAdminModel.deleteByClassAndAdmin(class_id, user_id);
      if (!result) {
        throw new Error("Vínculo classe/professor não encontrado.");
      } else {
        response.status(200).json("Classe desvinculada do professor!");
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },
};
