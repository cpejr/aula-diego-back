const path = require("path")
const pdf = require("pdf-creator-node");
const fs = require("fs");

const html = fs.readFileSync(path.resolve(__dirname, "certificate/certificate.html"), "utf8");

module.exports = {
  async createCertificate(request, response) {
    try {

      const options = {
        format: "A3",
        orientation: "landscape",
        border: "0",
      };

      const data = [
        {
          name: request.body.name,
          course: request.body.course,
          organization: request.body.organization,
          start_date: request.body.start_date,
          end_date: request.body.end_date,
          admin: request.body.admin,
          admin_occupation: request.body.admin_occupation
        },
      ];

      const document = {
        html: html,
        data: {
          course: data,
        },
        path: "./src/views/certificate/certificate.pdf",
        type: "",
      };

      pdf
        .create(document, options)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });

      response.status(200).json("Certificado criado com sucesso!");
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  }
};

