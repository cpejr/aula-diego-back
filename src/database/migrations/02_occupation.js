exports.up = (knex) =>{
    return knex.schema.createTable('organization', (table) => {
        table.string('id').primary().notNullable();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.bool('is_deleted').defaultTo(false);
    })    
}

exports.down = function (knex) {
    return knex.schema.dropTable('organization');
};