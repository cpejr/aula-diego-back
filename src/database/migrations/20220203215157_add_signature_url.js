exports.up = function (knex) {
  return knex.schema.table("user", (table) => {
    table.string("signature_url");
  });
};

exports.down = function (knex) {
  return knex.schema.table("user", (table) => {
    table.dropColumn("signature_url");
  });
};
