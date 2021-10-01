exports.up = function (knex) {
  return knex.schema.table("certificate", (table) => {
    table.renameColumn("certificate_id", "id");
  });
};

exports.down = function (knex) {
  return knex.schema.table("certificate", (table) => {
    table.renameColumn("id", "certificate_id");
  });
};
