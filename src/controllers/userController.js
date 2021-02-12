const UserModel = require("../models/UserModel");
const FirebaseModel = require("../models/FirebaseModel");
const { v4: uuidv4 } = require("uuid");
var datetime = require("node-datetime");

module.exports = {
  async create(request, response) {
    let firebaseUid;

    try {
      const user = request.body;
      user.id = uuidv4();
      user.created_at = new Date().getTime(); //Preciso fazer?
      user.updated_at = new Date().getTime(); //Preciso fazer?
      user.status = "pending";
      user.is_deleted = false;

      const year = new Date().getFullYear();
      const firstday = `${year}-01-01`;
      const lastday = `${year}-12-31`;
      const { count } = await connection("user")
        .whereBetween("created_at", [firstday, lastday])
        .count("id AS count")
        .first();
      const registration = year * 10000 + count;
      registration.toString();
      user.registrarion = registration;

      firebaseUid = await FirebaseModel.createNewUser(
        user.email,
        user.password
      );

      delete user.password;

      user.firebase_id = firebaseUid;

      const response = await UserModel.create(user);
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
      const result = UserModel.read(filters);
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
      const user = request.body;
      const loggedUser = request.session;

      if (loggedUser.id != user.id && loggedUser.type != "master")
        return response
          .status(403)
          .json("Você não tem permissão para realizar esta operação");

      const res = await UserModel.update(user);

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

      const foundUser = await UserModel.getById(id);

      if (!foundUser) {
        return response.status(404).json("Usuário não encontrado");
      }

      await FirebaseModel.deleteUser(foundUser.firebase_id);

      await UserModel.delete(id);

      response.status(200).json("Usuário apagado com sucesso!");
    } catch (error) {
      console.warn(error);
      response.status(500).json("internal server error ");
    }
  },
};
