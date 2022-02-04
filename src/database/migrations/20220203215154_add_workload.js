exports.up = function(knex) {
    return knex.schema.table('course', table => {
      table.integer('workload').notNullable().defaultTo(0);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.table('course', table => {
      table.dropColumn('workload');
    })
  };