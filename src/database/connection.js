// const knex = require('knex');
// const path = require('path');

// const connection = knex({
//   client: 'sqlite3',
//   connection: {
//     filename: path.resolve(__dirname, 'database.sqlite')
//   },
//   useNullAsDefault: true
// })

// module.exports = connection

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
console.log(configuration);

const connection = require('knex')(configuration);
module.exports = connection;