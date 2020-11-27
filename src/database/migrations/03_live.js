
exports.up = (knex) =>{
    return knex.schema.createTable('live',(table) =>{
        table.increments('live_id').primary().notNullable();
        table.string('title').notNullable();
        table.datetime('start_date').notNullable();
        table.string('description').notNullable();
        table.string('live_link').notNullable();
        table.time('duration').notNullable();
        table.string('confirmation_code').notNullable();
        table.integer('course_topic_id').references('course_topic_id').inTable('course_topic');
        table.integer('class_id').references('class_id').inTable('class');
        

    }   ) 
}

exports.down = function (knex) {
    return knex.schema.dropTable('live');
};