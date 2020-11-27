
exports.up = (knex) =>{
    return knex.schema.createTable('course'),(table) =>{
        table.increments('course_id').primary().notNullable();
        table.string('company').notNullable();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());

    }    
}

exports.down = function (knex) {
    return knex.schema.dropTable('course');
};