exports.up = (knex) => {
  return knex.schema.createTable("live_presence", (table) => {
    table.uuid("live_id").notNullable();
    table
      .foreign("live_id")
      .references("id")
      .inTable("live")
      .onDelete("NO ACTION");
    table.uuid("user_id").notNullable();
    table
      .foreign("user_id")
      .references("id")
      .inTable("user")
      .onDelete("NO ACTION");
    table.primary(["live_id", "user_id"]);
    table.bool("confirmation").defaultTo(false);
    table.integer("watch_time").defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("live_presence");
};
