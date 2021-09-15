const CertificateModel = require("../models/CertificateModel");

module.exports = {
  async create(request, response) {
    try {
      const certificate = request.body; 
      
      const result = await CertificateModel.create(certificate);
      console.log("result", result)
      return response
        .status(200)
        .json(result);
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("internal server error");
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const certificate = await CertificateModel.getById(id);
      return response.status(200).json(certificate);
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("internal server error");
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      const foundCertificate = await CertificateModel.getById(id);

      if (!foundCertificate) {
        throw new Error("Certificado não encontrado.");
      } else {
        await CertificateModel.delete(id);
        response.status(200).json("Certificado removido com sucesso!");
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  }
}