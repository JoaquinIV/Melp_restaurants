const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require('../connections/db.js');

class Restaurante extends Model { }

Restaurante.init(
    {
      id: {
        type: DataTypes.TEXT,
        primaryKey: true,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            max: 4,
            min: 0
        }
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      site: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            isEmail: true
        }
      },
      phone: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      street: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      city: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      state: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      lat: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      lng: {
        type: DataTypes.FLOAT,
        allowNull: false,
      }
    },
    { 
        sequelize: sequelize,
        modelName: "restaurants"
    },
  );

module.exports = Restaurante;