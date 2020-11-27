
exports.up = (knex) =>{
    return knex.schema.createTable('class'),(table) =>{
        table.increments('class_id').primary().notNullable();
        table.string('company').notNullable();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.string('code').notNullable();
        table.string('occupation').notNullable();
    }    
}

exports.down = function (knex) {
    return knex.schema.dropTable('class');
};