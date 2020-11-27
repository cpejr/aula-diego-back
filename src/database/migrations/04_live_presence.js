
exports.up = (knex) =>{
    return knex.schema.createTable('live_presence'),(table) =>{
        table.increments('live_presence_id').primary().notNullable();
        table.foreign('live_id').references('live_id').inTable('live');
        table.foreign('user_id').references('user_id').inTable('user');
        table.time('entry_time').notNullable();
        table.time('exit_time').notNullable();
        table.bool('confirmed').notNullable();
    }    
}

exports.down = function (knex) {
    return knex.schema.dropTable('live_presence');
};