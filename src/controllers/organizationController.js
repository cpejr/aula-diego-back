const OrganizationModel = require("../models/OrganizationModel");
const FileModel = require("../models/FileModel");

module.exports = {
  async create(request, response) {
    try {
      const { file_id, name, description } = request.body;

      const organization = {
        name,
        description,
        file_id,
      };

      await OrganizationModel.create(organization);

      return response.status(200).json({ organization });
    } catch (error) {
      console.warn(error);
      response.status(500).json("Internal server error");
    }
  },

  async read(request, response) {
    try {
      const filters = request.query;
      const organizations = await OrganizationModel.read(filters);
      return response.status(200).json(organizations);
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
      const { name, description, file_id } = request.body;
      const { user } = request.session;
      const { id } = request.params;

      const organization = await OrganizationModel.getById(id);

      if (
        !(
          (user.organization_id == organization.id && user.type != "student") ||
          user.type == "master"
        )
      ) {
        return response
          .status(403)
          .json("Você não tem permissão para realizar esta operação");
      }

      const res = await OrganizationModel.update({
        name,
        description,
        file_id,
      });

      if (res !== 1) {
        return response.status(404).json("Organização não encontrada!");
      }

      return response.status(200).json("Organização alterada com sucesso ");
    } catch (error) {
      console.log(error.message);
      return response.status(500).json("internal server error ");
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;

      const result = await OrganizationModel.delete(id);
      response.status(200).json("Organização apagada com sucesso!");
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("internal server error ");
    }
  },
};
