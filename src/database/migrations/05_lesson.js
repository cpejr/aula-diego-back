exports.up = (knex) =>{
    return knex.schema.createTable('occupation', (table) => {
        table.uuid('id').primary().notNullable();
        table.string('name').notNullable();
        table.string('description');
        table.uuid('course_id').notNullable();
        table.foreign('course_id').references('id').inTable('course').onDelete('NO ACTION');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.bool('is_deleted').defaultTo(false);
    })    
}

exports.down = function (knex) {
    return knex.schema.dropTable('occupation');
};