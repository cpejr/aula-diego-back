const connection = require("../database/connection");

module.exports = {
  async create(certificate) {
    console.log(certificate);
    const response = await connection("certificate").insert(certificate);
    return response;
  },

  async getById(id) {
    const response = await connection("certificate")
      .where({ "certificate.certificate_id": id })
      .select("*")
      .first();
    return response;
  },

//   async read(filters) {
//     const response = await connection("certificate")
//       .join("exercise", "certificate.exercise_id", "exercise.id")
//       .join("user", "certificate.user_id", "user.id")
//       .where(filters)
//       .andWhere("certificate.is_deleted", false)
//       .andWhere("exercise.is_deleted", false)
//       .select(
//         "certificate.*",
//         "exercise.name as exercise_name",
//         "exercise.id as exercise_id",
//         "exercise.course_id as course_id",
//         "exercise.questions as questions",
//         "user.name as user_name"
//       );
//     return response;
//   },

//   async update(certificate, exam_id) {
//     const response = await connection("certificate")
//       .where({ id: exam_id })
//       .update(certificate);
//     return response;
//   },

  async delete(certificate_id) {
    const response = await connection("certificate")
      .where({ certificate_id })
      .delete();
    return response;
  },
};
