exports.up = function(knex) {
    return knex.schema.table('user', table => {
      table.string('cpf').notNullable().defaultTo("000.000.000-00");
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.table('user', table => {
      table.dropColumn('cpf');
    })
  };