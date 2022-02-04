exports.up = (knex) => {
  return knex.schema.createTable('file', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary().notNullable();
    table.string('path').notNullable();
    table.string('name').notNullable();
    table.string('type').notNullable();
    table.uuid('user_id').notNullable();
    table.foreign('user_id').references('id').inTable('user').onDelete('NO ACTION');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.bool('is_deleted').defaultTo(false);
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('file');
};
