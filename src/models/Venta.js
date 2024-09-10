const { DataTypes } = require('sequelize');

const sequelize = require('../db/database.js');

const Usuario = require('./Usuario.js');

const Venta = sequelize.define(
  'Venta',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      references: {
        model: Usuario,
        key: 'id',
      },
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    fecha_venta: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'ventas',
    timestamps: false,
  }
);

module.exports = Venta;
