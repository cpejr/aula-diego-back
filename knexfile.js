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
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user:     process.env.DB_USER,
      password: process.env.DB_PASS,
      ssl: {
        rejectUnauthorized: false
      }
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
