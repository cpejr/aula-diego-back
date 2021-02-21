exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("course")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("course").insert([
        {
          id: "409d7aa6-55de-4051-8769-2b1b7a62de2e",
          name: "Primeiros Socorros",
          description: "descrição do curso de primeiros socorros",
          organization_id: "d9b6db58-86ce-4686-afb4-c76ef509d4d7",
          created_at: "2021-02-11 23:55:55",
          updated_at: "2021-02-11 23:55:55",
          is_deleted: false,
        },
      ]);
    });
};
