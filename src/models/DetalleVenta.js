const { DataTypes } = require('sequelize');

const sequelize = require('../db/database.js');

const Venta = require('./Venta.js');
const Producto = require('./Producto.js');

const DetalleVenta = sequelize.define(
  'DetalleVenta',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_venta: {
      type: DataTypes.INTEGER,
      references: {
        model: Venta,
        key: 'id',
      },
      allowNull: false,
    },
    id_producto: {
      type: DataTypes.INTEGER,
      references: {
        model: Producto,
        key: 'id',
      },
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: 'detalle_ventas',
    timestamps: false,
  }
);

module.exports = DetalleVenta;
