exports.up = (knex) => {
  return knex.schema.createTable('answer', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary().notNullable();
    table.uuid('exercise_id').notNullable();
    table.foreign('exercise_id').references('id').inTable('exercise').onDelete('NO ACTION');
    table.uuid('user_id').notNullable();
    table.foreign('user_id').references('id').inTable('user').onDelete('NO ACTION');
    table.json('answers').notNullable();
    table.json('correction');
    table.integer('grade');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.bool('is_deleted').defaultTo(false); 
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('answer');
};