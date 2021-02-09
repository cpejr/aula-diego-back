exports.up = (knex) =>{
    return knex.schema.createTable('organization_class', (table) => {
        table.foreign('organization_id').references('id').inTable('organization').onDelete('NO ACTION');
        table.foreign('class_id').references('id').inTable('class').onDelete('NO ACTION');
        table.primary(['organization_id', 'class_id'])
    })    
}

exports.down = function (knex) {
    return knex.schema.dropTable('organization_class');
};