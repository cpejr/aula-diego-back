exports.up = (knex) => {
  return knex.schema.table("organization", (table) => {
    table.uuid("file_id");
    table
      .foreign("file_id")
      .references("id")
      .inTable("file")
      .onDelete("NO ACTION");
  });
};

exports.down = function (knex) {
  return knex.schema.table("organization").dropColumn("file_id");
};
