exports.up = (knex) => {
  return knex.schema.createTable('exam', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary().notNullable();
    table.string('name').notNullable();
    table.timestamp('start_date').notNullable();
    table.timestamp('end_date').notNullable();
    table.json('body').notNullable();
    table.uuid('course_id').notNullable();
    table.foreign('course_id').references('id').inTable('course').onDelete('NO ACTION');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.bool('open').defaultTo(false);
    table.bool('is_deleted').defaultTo(false); 
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('exam');
};