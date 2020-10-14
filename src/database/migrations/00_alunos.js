exports.up = (knex) => {
  return knex.schema.createTable('alunos', (table) => {
    table.integer('matricula').primary();
    table.string('nome').notNullable();
    table.string('curso').notNullable();
  })
}

exports.down = (knex) => {
  knex.schema.dropTable('alunos');
}
