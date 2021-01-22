
exports.up = (knex) =>{
    return knex.schema.createTable('class_admin',(table) =>{
        table.increments('id').primary().notNullable();
        table.integer('class_id').references('class_id').inTable('class');
        table.integer('admin_id').references('user_id').inTable('user');
    }  )  
}

exports.down = function (knex) {
    return knex.schema.dropTable('class_admin');
};