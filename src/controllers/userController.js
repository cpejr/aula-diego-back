const UserModel = require("../models/UserModel");
const FirebaseModel = require("../models/FirebaseModel");
const { v4: uuidv4 } = require('uuid');
var datetime = require('node-datetime');

module.exports = {
  async createUser(request, response) {
    let firebaseUid;

    try {
      const user = {
        id: uuidv4(),
        name: request.body.name,
        email: request.body.email,
        birthdate: request.body.birthdate,
        phone: request.body.phone,
        company: null,
        occupation: null,
        password: request.body.password,
      };

      const year = new Date().getFullYear();
      const firstday = `${year}-01-01`;
      const lastday = `${year}-12-31`;
      const { count } = await connection("user")
        .whereBetween("created_at", [firstday, lastday])
        .count("id AS count")
        .first();
      const matricula = year * 10000 + count;
      matricula.toString();
      user.matricula = matricula;

      /* if (user.type === "admin" || user.type === "master") {
        const loggedUser = request.session.user;
        if (!loggedUser || (loggedUser && loggedUser.type !== "master")) {
          return response.status(403).json("Operção não permitida");
        }
      } */

      firebaseUid = await FirebaseModel.createNewUser(
        user.email,
        user.password
      );

      delete user.password;

      user.firebase_id = firebaseUid;

      const response = await UserModel.create(user);
      return response.status(200).json("Usuário Criado com succeso!!!!!");
      
    } catch (error) {
      if (firebaseUid) {
        FirebaseModel.deleteUser(firebaseUid);
      }
      console.warn(error.message);
      response.status(500).json("internal server error");
    }
  },

  async getOneUser(request, response) {
    try {
      const { id } = request.params;
      const user = await UserModel.getById(id);
      return response.status(200).json(user);
    } catch (error) {
      console.log(error.message);
      response.status(500).json("internal server error ");
    }
  },

  async getAllStudent(request, response) {
    try {
      const student = await UserModel.getAllByTypes("student");
      return response.status(200).json({ student });
    } catch (error) {
      console.log(error.message);
      response.status(500).json("internal server error ");
    }
  },

  async getAllAdmin(request, response) {
    try {
      const admin = await UserModel.getAllByTypes("admin");
      return response.status(200).json({ admin });
    } catch (error) {
      console.log(error.message);
      response.status(500).json("internal server error ");
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;

      const foundUser = await UserModel.getById(id);

      if (!foundUser) {
        throw new Error("Usuário não encontrado!");
      }

      await FirebaseModel.deleteUser(foundUser[0].firebase_id);

      await UserModel.delete(id);

      response.status(200).json("Usuário apagado com sucesso!");
    } catch (error) {
      console.log(error.message);
      response.status(500).json("internal server error ");
    }
  },

  async updateStudent(request, response) {
    try {
      const { id } = request.params;

      const updatedUser = request.body;

      const res = await UserModel.update(id, updatedUser);

      console.log(res);

      if (res !== 1) {
        return response.status(400).json("Usuário não encontrado!");
      } else {
        return response.status(200).json("Usuário alterado com sucesso ");
      }
    } catch (error) {
      console.log(error.message);
      return response.status(500).json("internal server error ");
    }
  },

  async promote(request, response) {
    try {
      const { id } = request.params;

      const res = await UserModel.promoteUser(id);

      console.log(res);

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

  async demote(request, response) {
    try {
      const { id } = request.params;

      const res = await UserModel.demoteUser(id);

      console.log(res);

      if (res !== 1) {
        return response.status(400).json("Usuário não encontrado");
      } else {
        return response.status(200).json("Usuário demovido para aluno!");
      }
    } catch (error) {
      console.log(error.message);
      return response.status(500).json("internal server error ");
    }
  },
};
