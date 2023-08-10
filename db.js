const { Sequelize } = require("sequelize");

// Read database credentials from environment variables
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT, NODE_ENV } = process.env;

const sequelize =
  NODE_ENV == "production"
    ? new Sequelize({
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        database: DB_NAME,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
        ssl: true,
      })
    : new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, { logging: false, native: false });

module.exports = sequelize;
