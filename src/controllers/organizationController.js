const OrganizationModel = require("../models/OrganizationModel");
const FileModel = require("../models/FileModel");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async create(request, response) {
    try {
      const data = request.body;
      const fileType = data.file_type.match(/.+(?=\/)/)[0];
      const fileExtension = data.file_original.match(/(?<=\.).+/)[0];
      const file_id = uuidv4();

      if (fileType !== "image") {
        console.warn('Avatar is not a image');
        response.status(500).json("Internal server error");
      }

      const logo = {
        id: file_id,
        name: data.file_name,
        type: fileExtension,
        path: `${file_id}.${fileExtension}`,
        user_id: data.user_id
      }

      const organization = {
        name: data.name,
        description: data.description,
        file_id: file_id
      }

      await FileModel.create(logo);
      await OrganizationModel.create(organization)
      
      return response.status(200).json({file_id: file_id});
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("Internal server error");
    }
  },

  async read(request, response) {
    try {
      const filters = request.query;
      const result = await OrganizationModel.read(filters);
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
      const { user } = request.session;
      const { id } = request.params;
      console.log(organization);

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

      const res = await OrganizationModel.update( organization );

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

      const result = await OrganizationModel.delete(id);
      response.status(200).json("Organização apagada com sucesso!");
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("internal server error ");
    }
  },
};
