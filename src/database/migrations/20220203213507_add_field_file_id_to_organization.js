exports.up = function(knex) {
  return knex.alterTable('organization', (table) => {
    table.uuid('file_id');
    table
      .foreign("file_id")
      .references("id")
      .inTable("file")
      .onDelete("NO ACTION");
  })
};

exports.down = function(knex) {
  return knex.alterTable('organization', (table) => {
    table.dropColumn("file_id");
  })
};
