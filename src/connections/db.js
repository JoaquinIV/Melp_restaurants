const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@dbpostgres:5432/${process.env.POSTGRES_DB}`, {
  define: {
    timestamps: false
  }
});

module.exports = sequelize;