exports.up = (knex) => {
  return knex.schema.createTable("organization", (table) => {
    table
      .uuid("id")
      .defaultTo(knex.raw("uuid_generate_v4()"))
      .primary()
      .notNullable();
    table.string("name").notNullable();
    table.text("description", "longtext");
    table
      .foreign("file_id")
      .references("id")
      .inTable("file")
      .onDelete("NO ACTION");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.bool("is_deleted").defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("organization");
};
