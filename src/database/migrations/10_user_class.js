exports.up = (knex) =>{
    return knex.schema.createTable('user_class', (table) => {
        table.foreign('user_id').references('id').inTable('user').onDelete('NO ACTION');
        table.foreign('class_id').references('id').inTable('class').onDelete('NO ACTION');
        table.primary(['user_id', 'class_id'])
    })    
}

exports.down = function (knex) {
    return knex.schema.dropTable('user_class');
};