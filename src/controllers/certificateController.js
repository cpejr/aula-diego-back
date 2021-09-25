const path = require("path");
const pdf = require("html-pdf");
const ejs = require("ejs");
const qr = require("qrcode");
const uuid = require("uuid");
const fs = require("fs");
const { upload, download } = require("../services/wasabi");

const User = require("../models/UserModel");
const Course = require("../models/CourseModel");
const Company = require("../models/OrganizationModel");
const Occupation = require("../models/OccupationModel");
// const Certificate = require("../models/CertificateModel");

async function createQrCode(url) {
  const result = await qr.toDataURL(url);
  return result;
}

module.exports = {
  async createCertificate(req, res) {
    try {
      const { user_id, course_id } = req.body;

      // get admin from request
      const { user: admin } = req.session;

      if (!admin) return res.status(401).json({ message: "Não autorizado" });

      if (!admin.signature_url)
        return res
          .status(400)
          .json({
            message:
              "Antes de gerar certificados é preciso criar uma ssinatura",
          });
      //get admin occupation
      const occupation = await Occupation.getById(admin.occupation_id);

      admin.occupation = occupation.name;

      // get user info
      const user = await User.getById(user_id);
      if (!user)
        return res.status(404).json({ message: "Usuário não encontrado" });

      // get course info
      const course = await Course.getById(course_id);
      if (!course)
        return res.status(404).json({ message: "Curso não encontrado" });

      console.log("curso: ", course);
      // get company info
      const company = await Company.getById(user.organization_id);
      if (!company)
        return res.status(404).json({ message: "Empresa não encontrada" });

      console.log("company: ", company);
      // generate certificate_id
      var certificate_id = uuid.v4();

      // generate qrcode
      const qrcode = await createQrCode(
        `${process.env.FRONT_END_URL}/certificate?code=${certificate_id}`
      );

      // TODO: get admin's signature
      const { body: signature } = await download(`image_2021-09-21_140911.png`);

      const recclass = `data:image/png;base64,${fs
        .readFileSync(
          path.resolve(__dirname, "..", "templates", "assets", "recclass.png")
        )
        .toString("base64")}`;
      const background = `data:image/png;base64,${fs
        .readFileSync(
          path.resolve(
            __dirname,
            "..",
            "templates",
            "assets",
            "certificateBG.png"
          )
        )
        .toString("base64")}`;

      // template payload
      const pdfData = {
        name: user.name,
        cpf: user.cpf,
        course: course.name,
        company: company.name,
        workload: company.workload,
        signature: recclass,
        admin: admin.name,
        occupation: admin.occupation,
        certificate_id,
        recclass,
        logo: recclass,
        background,
        qrcode,
      };

      await ejs.renderFile(
        path.resolve(__dirname, "..", "templates", "certificate.ejs"),
        pdfData,
        (err, data) => {
          if (err) {
            return res.status(500).json({ message: "Internal server error." });
          }

          const opt = {
            width: "11.25in",
            height: "8.5in",
          };

          pdf.create(data, opt).toBuffer((err, buffer) => {
            if (err)
              return res
                .status(500)
                .json({ message: "Internal server error." });

            // upload to wasabi
            // const uploadResult = await upload(`/certificate_${certificate_id}`, stream);
            // const certificate_url = uploadResult.Location();

            // save certificate data on database
            // TODO: certificate model
            // await Certificate.create({ certificate_id, course_id, user_id, url: certificate_url });

            return res.status(200).json({ pdf: buffer.toString("base64") });
          });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Internal server error." });
    }
  },
};
