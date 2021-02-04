const { update } = require("../database/connection");
const ClassModel = require("../models/ClassModel");
const LiveModel = require("../models/LiveModel");

module.exports = {
  async create(request, response) {
    try {
      const live = {
        title: request.body.title,
        description: request.body.description,
        live_link: request.body.live_link,
        start_date: request.body.date,
        /* time: request.body.time, */
        duration: request.body.duration,
        course: request.body.course,
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
      const allowed = await ClassModel.getUsersInClass(live_id);
      const user = request.session.user;

      for (let i in allowed) {
        if (user.user_id === allowed[i].user_id)
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
