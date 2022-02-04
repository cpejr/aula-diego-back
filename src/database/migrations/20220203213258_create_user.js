exports.up = (knex) => {
  return knex.schema.createTable("user", (table) => {
    table
      .uuid("id")
      .defaultTo(knex.raw("uuid_generate_v4()"))
      .primary()
      .notNullable();
    table.enu("type", ["master", "admin", "student"]).notNullable();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.integer("registration").notNullable();
    table.date("birthdate").notNullable();
    table.string("phone").notNullable();
    table.string("firebase_id").notNullable();
    table.uuid("organization_id").notNullable();
    table
      .foreign("organization_id")
      .references("id")
      .inTable("organization")
      .onDelete("NO ACTION");
    table.uuid("occupation_id").notNullable();
    table
      .foreign("occupation_id")
      .references("id")
      .inTable("occupation")
      .onDelete("NO ACTION");
    table.integer("score").notNullable().defaultTo(0);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table
      .enu("status", ["pending", "approved", "refused"])
      .defaultTo("pending")
      .notNullable();
    table.bool("is_deleted").defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user");
};
