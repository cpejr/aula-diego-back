exports.up = function (knex) {
  return knex.schema.table("certificate", (table) => {
    table.string("url");
  });
};

exports.down = function (knex) {
  return knex.schema.table("certificate", (table) => {
    table.dropColumn("url");
  });
};
