const { update } = require("../database/connection");
const LiveModel = require("../models/LiveModel");

module.exports = {
  async create(request, response) {
    try {
      const live = {
        title: request.body.title,
        start_date: request.body.start_date,
        description: request.body.description,
        live_link: request.body.live_link,
        duration: request.body.duration,
        confirmation_code: request.body.confirmation_code,
      };
      await LiveModel.createNewLive(live);
      response.status(200).json("Live criada com sucesso.");
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },

  async delete(request, response) {
    try {
      const { live_id } = request.params;
      console.log(live_id);
      const foundLive = await LiveModel.getById(live_id);
      console.log(foundLive);
      if (!foundLive) {
        throw new Error("Live não encontrada.");
      } else {
        await LiveModel.deleteLive(live_id);
        response.status(200).json("Live deletada com sucesso.");
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },
  async read(request, response) {
    try {
      const { live_id } = request.params;
      const live = await LiveModel.getById(live_id);
      return response.status(200).json(live);
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },
  async update(request, response) {
    try {
      const { live_id } = request.params;
      const newlive = request.body;
      const res = await LiveModel.updateLive(live_id, newlive);
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
