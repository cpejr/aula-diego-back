exports.up = (knex) =>{
    return knex.schema.createTable('file', (table) => {
        table.uuid('id').primary().notNullable();
        table.string('path').notNullable();
        table.foreign('user').references('id').inTable('user').onDelete('NO ACTION');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.bool('is_deleted').defaultTo(false);
    })    
}

exports.down = function (knex) {
    return knex.schema.dropTable('file');
};