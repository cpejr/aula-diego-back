exports.up = function(knex, Promise) {
    return knex.schema.table('user', function(t) {
        t.enum('status', ['pending', 'approved', 'refused']).notNull().defaultTo('approved');;
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('user', function(t) {
        t.dropColumn('status');
    });
};