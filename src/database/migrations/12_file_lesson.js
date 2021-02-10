exports.up = (knex) =>{
    return knex.schema.createTable('file_lesson', (table) => {
        table.uuid('file_id').notNullable();
        table.foreign('file_id').references('id').inTable('file').onDelete('NO ACTION');
        table.uuid('lesson_id').notNullable();
        table.foreign('lesson_id').references('id').inTable('lesson').onDelete('NO ACTION');
        table.primary(['file_id', 'lesson_id'])
    })    
}

exports.down = function (knex) {
    return knex.schema.dropTable('file_lesson');
};