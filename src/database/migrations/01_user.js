
exports.up = (knex) =>{
    return knex.schema.createTable('user',(table) =>{
        table.increments('user_id').primary().notNullable();
        table.string('email').notNullable();
        table.enu('type',['student','admin','master']).notNullable().defaultTo('student');
        table.string('name').notNullable();
        table.string('matricula').notNullable();
        table.string('company').notNullable();
        table.date('birthdate').notNullable();
        table.string('phone').notNullable();
        table.string('firebase_id').notNullable();
        table.string('occupation').notNullable();
    } )   
}

exports.down = function (knex) {
    return knex.schema.dropTable('user');
};