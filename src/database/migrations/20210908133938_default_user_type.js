exports.up = function(knex) {
    return knex.schema.table("user", function(table){
        table.enu("type", ["master", "admin", "student"]).defaultTo("student").notNullable().alter();
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.table('user', table => {
        table.enu("type", ["master", "admin", "student"]).notNullable().alter();
    })
  };