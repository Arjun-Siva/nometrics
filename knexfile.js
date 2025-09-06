require('dotenv').config();

module.exports = {
  production: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_USER_PASS,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    }
    },
    deployment: {
      client: 'pg',
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_ADMIN,
        password: process.env.DB_ADMIN_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
      }
    },
    migrations: {
      directory: './migrations',
    }
};
