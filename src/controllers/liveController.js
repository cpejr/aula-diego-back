const ClassModel = require("../models/ClassModel");
const LiveModel = require("../models/LiveModel");
const { v4: uuidv4 } = require("uuid");
var datetime = require("node-datetime");

module.exports = {
  async create(request, response) {
    try {
      const live = request.body;

      await LiveModel.createNewLive(live);
      response.status(200).json("Live criada com sucesso.");
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      const foundLive = await LiveModel.getById(id);

      if (!foundLive) {
        throw new Error("Live não encontrada.");
      } else {
        await LiveModel.deleteLive(id);
        response.status(200).json("Live deletada com sucesso.");
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const live = await LiveModel.getById(id);
      const allowed = await ClassModel.getUsersInClass(id);
      const user = request.session.user;

      for (let student in allowed) {
        if (user.user_id === student.user_id)
          return response.status(200).json(live);
      }

      return response.status(500).json("Unauthorized");
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },
  async update(request, response) {
    try {
      const { id } = request.params;
      const newlive = request.body;

      newLive.updated_at = datetime.getTime();

      const res = await LiveModel.updateLive(id, newlive);
      if (res !== 1) {
        return response.status(400).json("Live não encontrada!");
      } else {
        return response.status(200).json("Live alterada com sucesso ");
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },
};
