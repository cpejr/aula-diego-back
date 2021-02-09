exports.up = (knex) =>{
    return knex.schema.createTable('live_presence', (table) => {
        table.foreign('live_id').references('id').inTable('live').onDelete('NO ACTION');
        table.foreign('user_id').references('id').inTable('user').onDelete('NO ACTION');
        table.primary(['lesson_id', 'user_id']);
        table.bool('confirmarion').defaultTo(false);
        table.integer('watch_time').defaultTo(0);
    })    
}

exports.down = function (knex) {
    return knex.schema.dropTable('live_presence');
};