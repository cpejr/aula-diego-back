exports.up = (knex) =>{
    return knex.schema.createTable('user', (table) => {
        table.uuid('id').primary().notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.integer('registration').notNullable();
        table.date('birthdate').notNullable();
        table.string('phone').notNullable();
        table.uuid('organization_id').notNullable();
        table.foreign('organization_id').references('id').inTable('organization').onDelete('NO ACTION');
        table.uuid('occupation_id').notNullable();
        table.foreign('occupation_id').references('id').inTable('occupation').onDelete('NO ACTION');
        table.string('type').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.string('status').notNullable();
        table.bool('is_deleted').defaultTo(false);
    })    
}

exports.down = function (knex) {
    return knex.schema.dropTable('user');
};