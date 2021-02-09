exports.up = (knex) =>{
    return knex.schema.createTable('lesson_presence', (table) => {
        table.foreign('lesson_id').references('id').inTable('lesson').onDelete('NO ACTION');
        table.foreign('user_id').references('id').inTable('user').onDelete('NO ACTION');
        table.primary(['lesson_id', 'user_id']);
        table.bool('confirmarion').defaultTo(false);
    })    
}

exports.down = function (knex) {
    return knex.schema.dropTable('lesson_presence');
};