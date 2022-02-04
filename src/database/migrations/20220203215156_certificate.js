exports.up = (knex) => {
    return knex.schema.createTable("certificate", (table) => {
      table
        .uuid("certificate_id")
        .defaultTo(knex.raw("uuid_generate_v4()"))
        .primary()
        .notNullable();
      table.uuid('course_id').notNullable();
      table.foreign('course_id').references('id').inTable('course').onDelete('NO ACTION');
      table.uuid('user_id').notNullable();
      table.foreign('user_id').references('id').inTable('user').onDelete('NO ACTION');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("certificate");
  };
  