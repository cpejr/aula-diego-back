const UserModel = require("../models/UserModel");
const FirebaseModel = require("../models/FirebaseModel");

module.exports = {
  async createUser(request, response) {
    let firebaseUid;

    try {
      const user = {
        name: request.body.name,
        email: request.body.email,
        company: request.body.company,
        birthdate: request.body.birthdate,
        phone: request.body.phone,
        occupation: request.body.occupation,
        password: request.body.password,
        unit: request.body.unit,
        city: request.body.city,
        state: request.body.state,
      };

      if (
        user.type === "admin" ||
        user.type === "student" ||
        user.type === "master"
      ) {
        const loggedUser = request.session;

        if (loggedUser && loggedUser.type !== "admin") {
          return response.status(403).json("Operção não permitida");
        }
      }

      firebaseUid = await FirebaseModel.createNewUser(
        user.email,
        user.password
      );

      delete user.password;

      user.firebase_id = firebaseUid;

      const resposta = await UserModel.create(user);

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
      const { user_id } = request.params;
      const user = await UserModel.getById(user_id);
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

  async deleteStudent(request, response) {
    try {
      const { user_id } = request.params;

      const foundUser = await UserModel.getById(user_id);

      if (!foundUser) {
        throw new Error("Usuário não encontrado!");
      }

      await FirebaseModel.deleteUser(foundUser[0].firebase_id);

      await UserModel.delete(user_id);

      response.status(200).json("Usuário apagado com sucesso!");
    } catch (error) {
      console.log(error.message);
      response.status(500).json("internal server error ");
    }
  },

  async updateStudent(request, response) {
    try {
      const { user_id } = request.params;

      const updatedUser = request.body;

      const res = await UserModel.update(user_id, updatedUser);

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
      const { user_id } = request.params;

      const res = await UserModel.promoteUser(user_id);

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
      const { user_id } = request.params;

      const res = await UserModel.demoteUser(user_id);

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
