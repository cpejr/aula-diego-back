exports.up = (knex) => {
  return knex.schema.createTable('video_lesson', (table) => {
    table.string('video_url').notNullable();
    table.uuid('lesson_id').notNullable();
    table.foreign('lesson_id').references('id').inTable('lesson').onDelete('NO ACTION');
    table.primary(['video_url', 'lesson_id']);
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('video_lesson');
};
