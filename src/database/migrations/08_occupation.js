
exports.up = function(knex) {
    return knex.schema.createTable('occupation',(table) =>{
        table.string('id').primary().notNullable();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.string('organization_id').references('id').inTable('organization');
        table.boolean('is_deleted').notNullable();
        table.timestamps(true,true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('occupation');
};
