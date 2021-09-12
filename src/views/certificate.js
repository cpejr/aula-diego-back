const path = require("path");
const pdf = require("pdf-creator-node");
const fs = require("fs");
const qr = require("qrcode");
const { upload } = require("../services/wasabi");
const wasabiBaseUrl = "";

const html = fs.readFileSync(
  path.resolve(__dirname, "certificate/certificate.html"),
  "utf8"
);

async function createQrCode(url) {
  const result = await qr.toDataURL(url);
  return result;
}

module.exports = {
  async createCertificate(request, response) {
    try {
      const options = {
        format: "A4",
        orientation: "landscape",
        border: "0",
      };

      /* 
      TODO: criar qrcode, registro no banco e subir para o wasabi
      const userId = request.body.user_id;

      const uploadUrl = `${wasabiBaseUrl}${certificateId}`
      
      CRIAR REGISTRO NO BANCO DE DADOS 

      const qrcode = await createQrCode(`${frontEndURL}/certificate?code=${certificate_id}`) 
      */

      const data = [
        {
          name: request.body.name,
          course: request.body.course,
          organization: request.body.organization,
          start_date: request.body.start_date,
          end_date: request.body.end_date,
          admin: request.body.admin,
          admin_occupation: request.body.admin_occupation,
          // qrcode
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

      // TODO: fazer upload do arquivo para o wasabi

      response.status(200).json("Certificado criado com sucesso!");
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error.");
    }
  },
};
