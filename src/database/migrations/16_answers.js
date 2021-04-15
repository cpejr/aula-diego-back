exports.up = (knex) => {
  return knex.schema.createTable('answer', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary().notNullable();
    table.uuid('exam_id').notNullable();
    table.foreign('exam_id').references('id').inTable('exam').onDelete('NO ACTION');
    table.uuid('user_id').notNullable();
    table.foreign('user_id').references('id').inTable('user').onDelete('NO ACTION');
    table.json('answers').notNullable();
    table.json('correction');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.bool('is_deleted').defaultTo(false); 
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('answer');
};