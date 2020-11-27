
exports.up = (knex) =>{
    return knex.schema.createTable('users_in_class',(table) =>{
        table.increments('users_in_class_id').primary().notNullable();
        table.integer('class_id').references('class_id').inTable('class');
        table.integer('user_id').references('user_id').inTable('user');
    }  )  
}

exports.down = function (knex) {
    return knex.schema.dropTable('users_in_class');
};