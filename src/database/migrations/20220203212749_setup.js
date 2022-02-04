exports.up = (knex) => {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
}

exports.down = (knex) => {
  return knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"');
}
