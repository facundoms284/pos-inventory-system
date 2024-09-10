const Usuario = require('../models/Usuario.js');
const Producto = require('../models/Producto.js');
const Venta = require('../models/Venta.js');
const DetalleVenta = require('../models/DetalleVenta.js');

// Define associations between models

const defineAssociations = () => {
  // Un Usuario puede tener muchas Ventas
  Usuario.hasMany(Venta, {
    as: 'ventas',
    foreignKey: 'id_usuario',
  });
  Venta.belongsTo(Usuario, {
    as: 'usuario',
    foreignKey: 'id_usuario',
  });

  // Una Venta puede tener muchos Detalles De Venta
  Venta.hasMany(DetalleVenta, {
    as: 'detalles',
    foreignKey: 'id_venta',
  });
  DetalleVenta.belongsTo(Venta, {
    as: 'venta',
    foreignKey: 'id_venta',
  });

  // Un Producto puede estar en muchos Detalles de venta
  Producto.hasMany(DetalleVenta, {
    as: 'detalles',
    foreignKey: 'id_producto',
  });
  DetalleVenta.belongsTo(Producto, {
    as: 'producto',
    foreignKey: 'id_producto',
  });
};

module.exports = defineAssociations;
