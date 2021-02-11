
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        { name: 'Vitor Barros', email: 'vitorbarros@cpejr.com.br', registration: '20200005', birthdate: '2016-06-23', phone: '99999999999', organization_id: 'a4d9dd59-5b3e-4431-8a57-5b0c01a7661e', occupation_id: '5ee002c2-e06c-4472-b07f-41be372d9fb7', type: 'student' },
        { name: 'Daniel Benica', email: 'danielbenica@cpejr.com.br', registration: '20200004', birthdate: '2016-06-23', phone: '99999999999', organization_id: 'a4d9dd59-5b3e-4431-8a57-5b0c01a7661e', occupation_id: '5ee002c2-e06c-4472-b07f-41be372d9fb7', type: 'student' },
        { name: 'Diego Mulelos', email: 'diegomulelos@cpejr.com.br', registration: '20200006', birthdate: '2016-06-23', phone: '99999999999', organization_id: 'a4d9dd59-5b3e-4431-8a57-5b0c01a7661e', occupation_id: '4670ce5f-72a9-4151-b179-2d1f5f587534', type: 'master' },
        { name: 'Daniel Almeida', email: 'danielalmeida@cpejr.com.br', registration: '20200003', birthdate: '2016-06-23', phone: '99999999999', organization_id: 'a4d9dd59-5b3e-4431-8a57-5b0c01a7661e', occupation_id: '5ee002c2-e06c-4472-b07f-41be372d9fb7', type: 'student' },
        { name: 'Andre Mattos', email: 'andremattos@cpejr.com.br', registration: '20200002', birthdate: '2016-06-23', phone: '99999999999', organization_id: 'a4d9dd59-5b3e-4431-8a57-5b0c01a7661e', occupation_id: '5ee002c2-e06c-4472-b07f-41be372d9fb7', type: 'admin' },
        { name: 'Hermon Barros', email: 'hermonbarros@cpejr.com.br', registration: '20200001', birthdate: '2016-06-23', phone: '99999999999', organization_id: 'a4d9dd59-5b3e-4431-8a57-5b0c01a7661e', occupation_id: '4670ce5f-72a9-4151-b179-2d1f5f587534', type: 'admin' },
        { name: 'Gustavo Gomes', email: 'gustavogomes@cpejr.com.br', registration: '20210000', birthdate: '2016-06-23', phone: '31983131129', organization_id: 'a4d9dd59-5b3e-4431-8a57-5b0c01a7661e', occupation_id: '5ee002c2-e06c-4472-b07f-41be372d9fb7', type: 'admin' },
        { name: 'José Mattos', email: 'pedrogabriel@cpejr.com.br', registration: '20200000', birthdate: '2016-06-23', phone: '99999999999', organization_id: 'a4d9dd59-5b3e-4431-8a57-5b0c01a7661e', occupation_id: '4670ce5f-72a9-4151-b179-2d1f5f587534', type: 'admin' },
      ]);
    });
};
