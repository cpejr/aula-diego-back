const path = require("path");
const pdf = require("html-pdf");
const ejs = require("ejs");
const qr = require("qrcode");
const uuid = require("uuid");
const { upload, download } = require("../services/wasabi");

const User = require("../models/UserModel");
const Course = require("../models/CourseModel");
const Company = require("../models/OrganizationModel");
// const Certificate = require("../models/CertificateModel");

async function createQrCode(url) {
  const result = await qr.toDataURL(url);
  return result;
}

module.exports = {
  async createCertificate(req, res) {
    try {
      const { user_id, course_id } = req.body;
      const admin = req.session;

      // get user info
      const user = await User.getById(user_id);
      if (!user)
        return res.status(404).json({ message: "Usuário não encontrado" });

      // get course info
      const course = await Course.getById(course_id);
      if (!course)
        return res.status(404).json({ message: "Curso não encontrado" });

      // get company info
      const company = await Company.getById(user.organization_id);
      if (!company)
        return res.status(404).json({ message: "Empresa não encontrada" });

      // generate certificate_id
      var certificate_id = uuid.v4();

      // generate qrcode
      const qrcode = await createQrCode(
        `${process.env.FRONT_END_URL}/certificate?code=${certificate_id}`
      );

      // TODO: get admin's signature
      const { body: signature } = await download(`signature_${admin.id}`);

      // template payload
      const pdfData = {
        name: user.name,
        cpf: user.cpf,
        course: course.name,
        company: company.name,
        workload: company.workload,
        signature,
        admin: admin.name,
        occupation: admin.occupation,
        certificate_id,
        qrcode,
      };

      ejs.renderFile(
        path.resolve(__dirname, "..", "templates", "certificate.ejs"),
        pdfData,
        (err, data) => {
          if (err)
            return res.status(500).json({ message: "Internal server error." });

          const opt = {
            width: "11.25in",
            height: "8.5in",
            header: {
              height: "20mm",
            },
            footer: {
              height: "20mm",
            },
          };

          pdf.create(data, opt).toStream((err, stream) => {
            if (!err)
              return res
                .status(500)
                .josn({ message: "Internal server error." });

            // upload to wasabi
            // const uploadResult = await upload(`/certificate_${certificate_id}`, stream);
            // const certificate_url = uploadResult.Location();

            // save certificate data on database
            // TODO: certificate model
            // await Certificate.create({ certificate_id, course_id, user_id, url: certificate_url });

            return res.status(200).json({ pdf: stream });
          });

          return res.send("Certificado criado com sucesso");
        }
      );

      res.status(200).json({ message: "Certificado criado com sucesso!" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Internal server error." });
    }
  },
};
