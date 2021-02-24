exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("class")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("class").insert([
        {
          id: "409d7aa6-55de-4051-8769-2b1b7a62de2e",
          name: "matutino",
          description: "descrição da turma matutino",
          organization_id: "d9b6db58-86ce-4686-afb4-c76ef509d4d7",
          course_id: "fcaf0e75-8931-41c9-888e-0bb371fbe698",
          created_at: "2021-02-11 23:55:55",
          updated_at: "2021-02-11 23:55:55",
          is_deleted: false,
        },
      ]);
    });
};
