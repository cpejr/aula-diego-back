const OrganizationModel = require("../models/OrganizationModel");
const FirebaseModel = require("../models/FirebaseModel");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async createUser(request, response) {
    let firebaseUid;

    try {
      const organization = request.body;
      organization.id = uuidv4();
      organization.created_at = new Date().getTime(); //Preciso fazer?
      organization.updated_at = new Date().getTime(); //Preciso fazer?
      organization.is_deleted = false;

      organization.firebase_id = firebaseUid;

      const response = await OrganizationModel.create(organization);
      return response.status(200).json("Usuário Criado com succeso!");
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("internal server error");
    }
  },

  async read(request, response) {
    try {
      const filters = request.query;
      const result = OrganizationModel.read(filters);
      return response.status(200).json(result);
    } catch (error) {
      console.warn(error);
      response.status(500).json("internal server error");
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const organization = await OrganizationModel.getById(id);
      return response.status(200).json(organization);
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("internal server error");
    }
  },
  async update(request, response) {
    try {
      const organization = request.body;
      const loggedUser = request.session;

      if (
        !(
          (loggedUser.organization == organization.id &&
            loggedUser.type != "student") ||
          loggedUser.type == "master"
        )
      )
        return response
          .status(403)
          .json("Você não tem permissão para realizar esta operação");

      const res = await OrganizationModel.update(organization);

      if (res !== 1) {
        return response.status(404).json("Organização não encontrada!");
      } else {
        return response.status(200).json("Organização alterada com sucesso ");
      }
    } catch (error) {
      console.log(error.message);
      return response.status(500).json("internal server error ");
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;

      const result = await organization.delete(id);
      response.status(200).json("Organização apagada com sucesso!");
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("internal server error ");
    }
  },
};
