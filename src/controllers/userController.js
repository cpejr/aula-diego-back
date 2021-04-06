const UserModel = require("../models/UserModel");
const FirebaseModel = require("../models/FirebaseModel");
const LivePresenceModel = require("../models/LivePresenceModel");

const { v4: uuidv4 } = require("uuid");
var datetime = require("node-datetime");
const connection = require("../database/connection");
const LessonPresenceModel = require("../models/LessonPresenceModel");

module.exports = {
  async create(request, response) {
    let firebaseUid;

    try {
      const user = request.body;
      user.status = "pending";

      const year = new Date().getFullYear();
      const firstday = `${year}-01-01`;
      const lastday = `${year}-12-31`;
      const { count } = await connection("user")
        .whereBetween("created_at", [firstday, lastday])
        .count("id AS count")
        .first();
      const registration = year * 10000 + count;
      registration.toString();
      user.registration = registration;

      firebaseUid = await FirebaseModel.createNewUser(
        user.email,
        user.password
      );

      delete user.password;

      user.firebase_id = firebaseUid;

      const res = await UserModel.create(user);
      return response.status(200).json("Usuário Criado com succeso!");
    } catch (error) {
      if (firebaseUid) {
        FirebaseModel.deleteUser(firebaseUid);
      }
      console.warn(error.message);
      response.status(500).json("internal server error");
    }
  },

  async read(request, response) {
    try {
      const filters = request.query;
      const result = await UserModel.read(filters);
      return response.status(200).json(result);
    } catch (error) {
      console.warn(error);
      response.status(500).json("internal server error");
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const user = await UserModel.getById(id);
      return response.status(200).json(user);
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("internal server error");
    }
  },

  async update(request, response) {
    try {
      const { id } = request.params;
      const update = request.body;
      const loggedUser = request.session;

      if (loggedUser.id != user.id && loggedUser.type == "student")
        return response
          .status(403)
          .json("Você não tem permissão para realizar esta operação");

      const res = await UserModel.update(id, update);

      if (res !== 1) {
        return response.status(404).json("Usuário não encontrado!");
      } else {
        return response.status(200).json("Usuário alterado com sucesso ");
      }
    } catch (error) {
      console.log(error.message);
      return response.status(500).json("internal server error ");
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      const result = await UserModel.delete(id);
      // const foundUser = await UserModel.getById(id);

      // if (!foundUser) {
      //   return response.status(404).json("Usuário não encontrado");
      // }

      // await FirebaseModel.deleteUser(foundUser.firebase_id);

      // await UserModel.delete(id);
      if (res !== 1) {
        return response.status(400).json("Usuário não encontrado");
      } else {
        return response
          .status(200)
          .json("Usuário Promovido para administrador");
      }
    } catch (error) {
      console.log(error.message);
      return response.status(500).json("internal server error ");
    }
  },

  async forgottenPassword(request, response) {
    try {
      const { email } = request.body;

      response.status(200).json("Usuário apagado com sucesso!");
      const response = await FirebaseModel.sendPasswordChangeEmail(email);

      response.status(200).json({ message: "Sucesso!" });
    } catch (err) {
      console.error(err);
      return response.status(500).json({ notification: err.message });
    }
  },

  async demote(request, response) {
    try {
      const { user_id } = request.params;

      const res = await UserModel.demoteUser(user_id);

      console.log(res);

      if (res !== 1) {
        return response.status(400).json("Usuário não encontrado");
      } else {
        return response.status(200).json("Usuário demovido para aluno!");
      }
    } catch (error) {
      console.warn(error);
      response.status(500).json("internal server error ");
    }
  },
  // extra functions:

  async getScore(request, response) {
    try {
      const { user_id } = request.body;

      const totalLives = await LivePresenceModel.getLiveCount(user_id);
      const totalLessons = await LessonPresenceModel.getLessonCount(user_id);

      const watchedLives = await LivePresenceModel.read({
        user_id,
        confirmation: true,
      });
      const completedLessons = await LessonPresenceModel.read({
        user_id,
        confirmation: true,
      });

      let score =
        ((watchedLives.length + completedLessons.length) /
          (totalLives + totalLessons)) *
        1000;
      score = score.toFixed(2);
      response.status(200).json({ score });
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("internal server error ");
    }
  },
};
