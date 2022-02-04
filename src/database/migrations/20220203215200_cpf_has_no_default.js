exports.up = function (knex) {
  return knex.schema.raw(`
      ALTER TABLE "user" 
      ALTER COLUMN "cpf"
      DROP DEFAULT;
    `);
};

exports.down = function (knex) {
  return knex.schema.raw(`
      ALTER TABLE "user" 
      ALTER COLUMN "cpf"
      SET DEFAULT "000.000.000-00";
    `);
};
