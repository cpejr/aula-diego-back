const ClassModel = require("../models/ClassModel");
const LiveModel = require("../models/LiveModel");
const { v4: uuidv4 } = require("uuid");
var datetime = require("node-datetime");

module.exports = {
  async create(request, response) {
    try {
      const live = request.body;

      await LiveModel.create(live);
      response.status(200).json({ message: "Live criada com sucesso." });
    } catch (error) {
      console.error(error.message);
      response.status(500).json({ message: "Internal server error." });
    }
  },

  async read(request, response) {
    try {
      const filters = request.query;
      const result = await LiveModel.read(filters);

      return response.status(200).json(result);
    } catch (error) {
      console.warn(error);
      response.status(500).json({ message: "Internal server error." });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      const foundLive = await LiveModel.getById(id);

      if (!foundLive) {
        return response.status(404).json({ message: "Live não encontrada." });
      } else {
        await LiveModel.delete(id);
        response.status(200).json({ message: "Live deletada com sucesso." });
      }
    } catch (error) {
      console.error(error.message);
      response.status(500).json({ message: "Internal server error." });
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const live = await LiveModel.getById(id);

      return response.status(200).json(live);
    } catch (error) {
      console.error(error.message);
      response.status(500).json({ message: "Internal server error." });
    }
  },
  async update(request, response) {
    try {
      const { id } = request.params;
      const live = request.body;

      const res = await LiveModel.update(live, id);
      if (res !== 1) {
        return response.status(404).json({ message: "Live não encontrada!" });
      } else {
        return response
          .status(200)
          .json({ message: "Live alterada com sucesso" });
      }
    } catch (error) {
      console.error(error.message);
      response.status(500).json({ message: "Internal server error." });
    }
  },
};
