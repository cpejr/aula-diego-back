const path = require("path");
const pdf = require("html-pdf");
const ejs = require("ejs");
const qr = require("qrcode");
const uuid = require("uuid");
const fs = require("fs");
const { upload, uploadBase64, download } = require("../services/wasabi");

const User = require("../models/UserModel");
const Course = require("../models/CourseModel");
const Company = require("../models/OrganizationModel");
const Occupation = require("../models/OccupationModel");
const Certificate = require("../models/CertificateModel");

async function createQrCode(url) {
  const result = await qr.toDataURL(url);
  return result;
}

module.exports = {
  async createCertificate(req, res) {
    try {
      const { user_id, course_id } = req.body;

      const { user: admin } = req.session;

      if (!admin) return res.status(401).json({ message: "Não autorizado" });

      const certificateExists = await Certificate.getByUserIdAndCourseId(
        user_id,
        course_id
      );
      if (certificateExists) {
        return res.status(400).json({
          message: "Certificado já existente na base de dados",
          url: certificateExists.url,
        });
      }

      //admin need a signature to be able to generate certificates
      if (!admin.signature_url)
        return res.status(400).json({
          message: "Antes de gerar certificados é preciso criar uma assinatura",
        });

      const occupation = await Occupation.getById(admin.occupation_id);
      admin.occupation = occupation.name;

      const user = await User.getById(user_id);
      if (!user)
        return res.status(404).json({ message: "Usuário não encontrado" });

      const course = await Course.getById(course_id);
      if (!course)
        return res.status(404).json({ message: "Curso não encontrado" });

      const company = await Company.getById(user.organization_id);
      if (!company)
        return res.status(404).json({ message: "Empresa não encontrada" });

      var certificate_id = uuid.v4();

      const qrcode = await createQrCode(
        `${process.env.FRONT_END_URL}/certificate?code=${certificate_id}`
      );

      const { Body: signatureBody } = await download(
        `signature_${admin.id}.png`
      );
      const signature = `data:image/png;base64,${signatureBody.toString(
        "base64"
      )}`;

      const recclass_logo = `data:image/png;base64,${fs
        .readFileSync(
          path.resolve(__dirname, "..", "templates", "assets", "recclass.png")
        )
        .toString("base64")}`;

      const { Body: logoBody } = await download(`logo_${company.id}.png`);
      const company_logo = `data:image/png;base64,${logoBody.toString(
        "base64"
      )}`;

      // get certificate background image
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
        signature,
        admin: admin.name,
        occupation: admin.occupation,
        certificate_id,
        recclass: recclass_logo,
        logo: company_logo,
        background,
        qrcode,
      };

      // render HTML
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

          // generate pdf buffer
          pdf.create(data, opt).toBuffer(async (err, buffer) => {
            if (err)
              return res
                .status(500)
                .json({ message: "Internal server error." });

            const uploadResult = await uploadBase64(
              `certificate_${certificate_id}`,
              buffer,
              "application/pdf"
            );
            const certificate_url = uploadResult.Location;

            await Certificate.create({
              id: certificate_id,
              course_id,
              user_id,
              url: certificate_url,
            });

            return res.status(200).json({
              pdf_base64: buffer.toString("base64"),
              url: certificate_url,
            });
          });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Internal server error." });
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const certificate = await Certificate.getById(id);
      return response.status(200).json(certificate);
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("internal server error");
    }
  },

  async getByUserIdAndCourseId(request, response) {
    try {
      const { user_id, course_id } = request.params;
      const certificate = await Certificate.getByUserIdAndCourseId(
        user_id,
        course_id
      );
      return response.status(200).json(certificate);
    } catch (error) {
      console.warn(error.message);
      response.status(500).json("internal server error");
    }
  },
};
