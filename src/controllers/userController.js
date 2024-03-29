const UserModel = require("../models/UserModel");
const FirebaseModel = require("../models/FirebaseModel");
const connection = require("../database/connection");
const LessonPresenceModel = require("../models/LessonPresenceModel");
const OrganizationModel = require("../models/OrganizationModel");
const { upload, uploadBase64 } = require("../services/wasabi");
const CertificateModel = require("../models/CertificateModel");

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

      await UserModel.create(user);
      return response.status(200).json("Usuário Criado com succeso!");
    } catch (error) {
      if (firebaseUid) {
        FirebaseModel.deleteUser(firebaseUid);
      }
      console.warn(error.message);
      response.status(500).json({ message: "Internal server error." });
    }
  },

  async read(request, response) {
    try {
      const filters = request.query;
      const result = await UserModel.read(filters);
      return response.status(200).json(result);
    } catch (error) {
      console.warn(error);
      response.status(500).json({ message: "Internal server error." });
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const user = await UserModel.getById(id);
      return response.status(200).json(user);
    } catch (error) {
      console.warn(error.message);
      response.status(500).json({ message: "Internal server error." });
    }
  },

  async getMyOrganization(request, response) {
    try {
      const { user } = request.session;
      const organization = await OrganizationModel.getById(
        user.organization_id
      );
      return response.status(200).json(organization);
    } catch (error) {
      console.warn(error.message);
      response.status(500).json({ message: "Internal server error." });
    }
  },

  async getMyCertificates(request, response) {
    try {
      const { user } = request.session;
      const { course_id } = request.query;
      if (course_id) {
        const certificate = await CertificateModel.getByUserIdAndCourseId(
          user.id,
          course_id
        );
        return response.status(200).json(certificate);
      }

      const certificates = await CertificateModel.getByUserId(user.id);
      return response.status(200).json(certificates);
    } catch (error) {
      console.warn(error.message);
      response.status(500).json({ message: "Internal server error." });
    }
  },

  async update(request, response) {
    try {
      const user = request.body;

      const { user: loggedUser } = request.session;

      if (loggedUser.id != user.id && loggedUser.type == "student")
        return response.status(403).json({
          message: "Você não tem permissão para realizar esta operação",
        });

      let = signature_url = null;

      if (user.signature) {
        const signaturePath = `signature_${loggedUser.id}.png`;
        const signatureBuffer = Buffer.from(
          user.signature.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );

        const dataResult = await uploadBase64(
          signaturePath,
          signatureBuffer,
          "image/png"
        );

        const { Location } = dataResult;

        user.signature_url = Location;
        delete user.signature;
      }

      const res = await UserModel.update(user);

      if (res !== 1) {
        return response
          .status(404)
          .json({ message: "Usuário não encontrado!" });
      } else {
        return response
          .status(200)
          .json({ message: "Usuário alterado com sucesso" });
      }
    } catch (error) {
      console.error(error.message);
      return response
        .status(500)
        .json({ message: { message: "Internal server error." } });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      const result = await UserModel.delete(id);
      const foundUser = await UserModel.getById(id);

      if (!foundUser) {
        return response.status(404).json({ message: "Usuário não encontrado" });
      }

      await UserModel.delete(id);
      if (result !== 1) {
        return response.status(400).json({ message: "Usuário não encontrado" });
      } else {
        return response
          .status(200)
          .json({ message: "Usuário Promovido para administrador" });
      }
    } catch (error) {
      console.error(error.message);
      return response.status(500).json("internal server error ");
    }
  },

  async forgottenPassword(request, response) {
    try {
      const { email } = request.body;

      response.status(200).json({ message: "Usuário apagado com sucesso!" });
      const response = await FirebaseModel.sendPasswordChangeEmail(email);

      response.status(200).json({ message: "Sucesso!" });
    } catch (err) {
      console.error(err);
      return response.status(500).json({ message: err.message });
    }
  },
};
