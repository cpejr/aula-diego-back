
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        { name: 'Vitor Barros', email: 'vitorbarros@cpejr.com.br', registration: '20200005', birthdate: '2016-06-23', phone: '99999999999', firebase_id: 'Dq7zATYosAOQLnTBRKLKMlUfhrY2', organization_id: 'd9b6db58-86ce-4686-afb4-c76ef509d4d7', occupation_id: 'd9481060-08c2-436e-aa2f-480053d2ee6d', type: 'student' },
        { name: 'Daniel Benica', email: 'danielbenica@cpejr.com.br', registration: '20200004', birthdate: '2016-06-23', phone: '99999999999', firebase_id: 'MnHTxFZ6rbaRXMA0jAEEwXvV9jC2', organization_id: 'd9b6db58-86ce-4686-afb4-c76ef509d4d7', occupation_id: 'd9481060-08c2-436e-aa2f-480053d2ee6d', type: 'student' },
        { name: 'Diego Mulelos', email: 'diegomulelos@cpejr.com.br', registration: '20200006', birthdate: '2016-06-23', phone: '99999999999', firebase_id: 'JidMmOkMC7TeeWXz0hYgpqXVx313', organization_id: 'd9b6db58-86ce-4686-afb4-c76ef509d4d7', occupation_id: 'e15c23a4-0d9c-443a-ae5c-6a9a81bcdcc6', type: 'master' },
        { name: 'Daniel Almeida', email: 'danielalmeida@cpejr.com.br', registration: '20200003', birthdate: '2016-06-23', phone: '99999999999', firebase_id: 'bUNf6WeE9sT1MtCIX7W0pbeOe6b2', organization_id: 'd9b6db58-86ce-4686-afb4-c76ef509d4d7', occupation_id: 'd9481060-08c2-436e-aa2f-480053d2ee6d', type: 'student' },
        { name: 'Andre Mattos', email: 'andremattos@cpejr.com.br', registration: '20200002', birthdate: '2016-06-23', phone: '99999999999', firebase_id: 'nONybkK0ifSsedKb84Rk6stYRP62', organization_id: 'd9b6db58-86ce-4686-afb4-c76ef509d4d7', occupation_id: 'd9481060-08c2-436e-aa2f-480053d2ee6d', type: 'admin' },
        { name: 'Hermon Barros', email: 'hermonbarros@cpejr.com.br', registration: '20200001', birthdate: '2016-06-23', phone: '99999999999', firebase_id: 'GDdPZnJ9okaE9e889k6gIivixVy1', organization_id: 'd9b6db58-86ce-4686-afb4-c76ef509d4d7', occupation_id: 'e15c23a4-0d9c-443a-ae5c-6a9a81bcdcc6', type: 'admin' },
        { name: 'Gustavo Gomes', email: 'gustavogomes@cpejr.com.br', registration: '20210000', birthdate: '2016-06-23', phone: '31983131129', firebase_id: 'xkagBE1X0Vcr8Ay24HMA0Gbq0Vr2', organization_id: 'd9b6db58-86ce-4686-afb4-c76ef509d4d7', occupation_id: 'd9481060-08c2-436e-aa2f-480053d2ee6d', type: 'admin' },
        { name: 'José Mattos', email: 'pedrogabriel@cpejr.com.br', registration: '20200000', birthdate: '2016-06-23', phone: '99999999999', firebase_id: 'zpt1tCijEngT8y41L2N7dcfzqb53', organization_id: 'd9b6db58-86ce-4686-afb4-c76ef509d4d7', occupation_id: 'e15c23a4-0d9c-443a-ae5c-6a9a81bcdcc6', type: 'admin' },
      ]);
    });
};
