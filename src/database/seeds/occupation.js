exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("occupation")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("occupation").insert([
        {
          id: "e15c23a4-0d9c-443a-ae5c-6a9a81bcdcc6",
          name: "Médico",
          description: "O médico investiga a natureza e as causas das doenças.",
          organization_id: "d9b6db58-86ce-4686-afb4-c76ef509d4d7",
          created_at: "2021-02-11 23:55:55",
          updated_at: "2021-02-11 23:55:55",
          is_deleted: false,
        },
        {
          id: "d9481060-08c2-436e-aa2f-480053d2ee6d",
          name: "Enfermairo",
          description:
            "Profissional da saúde responsável pelo atendimento mais direto e próximo ao paciente.",
          organization_id: "d9b6db58-86ce-4686-afb4-c76ef509d4d7",
          created_at: "2021-02-11 23:55:55",
          updated_at: "2021-02-11 23:55:55",
          is_deleted: false,
        },
      ]);
    });
};
