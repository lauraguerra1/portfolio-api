const dotenv = require('dotenv')
dotenv.config()
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      port: 5433,
      database: 'portfolio',
      user:     'postgres',
      password: process.env.NODE_DB_PASS
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'cockroachdb',
    connection: {
      connectionString: process.env.NODE_DB_CONNECTION,
      ssl: {
        rejectUnauthorized: false,
      }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
  }
};
