exports.up = (knex) => {
  return knex.schema.createTable("question", (table) => {
    table
      .uuid("id")
      .defaultTo(knex.raw("uuid_generate_v4()"))
      .primary()
      .notNullable();
    table.uuid("user_id").notNullable();
    table.string("user_name").notNullable();
    table
      .foreign("user_id")
      .references("id")
      .inTable("user")
      .onDelete("NO ACTION");
    table.uuid("parent_id").notNullable();
    table.string("parent_name").notNullable();
    table.string("parent_path").notNullable();
    table.string("question").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.bool("is_deleted").defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("question");
};
