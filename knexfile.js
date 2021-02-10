// Update with your config settings.
const path = require('path');
require('dotenv').config();

module.exports = {

  // development: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
  //   },
  //   migrations: {
  //     directory: path.resolve(__dirname, 'src', 'database', 'migrations')
  //   },
  //   useNullAsDefault: true
  // },

  development: {
    client: 'pg',
    dialect: "postgres",
    connection: {
      host: "ec2-3-222-11-129.compute-1.amazonaws.com",
      port: 5432,
      database: "d4jprps36s7o0o",
      user:     "whrvkyvkrteybf",
      password: "24bcaba6b41214493cdbd6ad54d61a8d17935d49763ecd6a7011f4f531fc1779",
      ssl: true
    },
    dialectOptions: {
      ssl: true,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    ssl: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
