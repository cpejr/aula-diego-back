exports.seed = function(knex) {
  return createOrganization(knex)
    .then(function () {
      return createOccupation
    })
    .then(function () {
      return createMaster(knex);
    });
};

const nullId = '00000000-0000-0000-0000-000000000000';

function createOrganization(knex) {
  return knex('organization').del()
    .then(function () {
      return knex('organization').insert([
        {
          id: nullId,
          name: 'admin',
          description: 'Plataforma de cursos online',
          is_deleted: false
        },
      ]);
    });
}

function createOccupation(knex) {
  return knex('occupation').del()
    .then(function () {
      return knex('occupation').insert([
        {
          id: nullId,
          name: 'Master',
          description: 'Responsável pelo gerenciamento do sistema',
          organization_id: nullId,
          is_deleted: false
        },
      ]);
    });
}

function createMaster(knex) {
  return knex('organization').del()
    .then(function () {
      return knex('organization').insert([
        {
          id: nullId,
          type: 'master',
          name: 'admin',
          email: 'contato@recstudio.com.br',
          registration: '123456789',
          birthdate: '2000-01-01',
          phone: '123456789',
          firebase_id: '1mjLl4AvANPbxPWYxRBbN6S2k2y2',
          organization_id: nullId,
          occupation_id: nullId,
          score: 0,
          status: 'approved',
          is_deleted: false
        },
      ]);
    });
}
