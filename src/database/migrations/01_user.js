
exports.up = (knex) =>{
    return knex.schema.createTable('user',(table) =>{
        table.string('user_id').primary().notNullable();
        table.string('email').unique().notNullable();
        table.enu('type',['student','admin','master']).notNullable().defaultTo('student');
        table.string('name').notNullable();
        table.string('matricula').notNullable();
        table.string('company').notNullable();
        table.date('birthdate').notNullable();
        table.string('phone').notNullable();
        table.string('firebase_id');
        table.string('occupation').notNullable();
        table.string('unit').notNullable();
        table.string('city').notNullable();
        table.string('state').notNullable();
        table.timestamps(true,true);
    } )   
}

exports.down = function (knex) {
    return knex.schema.dropTable('user');
};