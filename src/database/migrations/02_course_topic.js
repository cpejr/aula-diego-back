
exports.up = (knex) =>{
    return knex.schema.createTable('course_topic',(table) =>{
        table.increments('course_topic_id').primary().notNullable();
        table.integer('course_id').references('course_id').inTable('course');
        table.string('topic_name').notNullable();
        table.string('description').notNullable();
    } )   
}

exports.down = function (knex) {
    return knex.schema.dropTable('course_topic');
};