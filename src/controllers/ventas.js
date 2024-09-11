const Venta = require('../models/Venta');
const DetalleVenta = require('../models/DetalleVenta');
const Producto = require('../models/Producto');
const Usuario = require('../models/Usuario');
const sequelize = require('../db/database');

// Helper function to check product stock and create sale details
const crearDetalleVenta = async (producto, cantidad, id_venta, t) => {
  if (!producto) throw new Error(`Producto no encontrado`);
  if (
    producto.cantidad_disponible < cantidad ||
    producto.cantidad_disponible <= 0
  )
    throw new Error(`No hay stock disponible del producto ${producto.nombre}`);

  const subtotal = producto.precio * cantidad;

  await DetalleVenta.create(
    {
      id_venta,
      id_producto: producto.id,
      cantidad,
      precio_unitario: producto.precio,
      subtotal,
    },
    { transaction: t }
  );

  producto.cantidad_disponible -= cantidad;
  await producto.save({ transaction: t });

  return { producto, cantidad, precio_unitario: producto.precio, subtotal };
};

// List all existing sales
const listarVentas = async (req, res) => {
  try {
    const allVentas = await Venta.findAll();

    res.status(allVentas.length ? 200 : 404).json({
      message: allVentas.length
        ? 'Ventas obtenidas correctamente'
        : 'No se encontraron ventas',
      data: allVentas,
    });
  } catch (error) {
    console.error('Error al obtener todas las ventas:', error);
    res.status(500).json({ error: 'Error al obtener todas las ventas' });
  }
};

const crearVenta = async (req, res) => {
  const { id_usuario, productos } = req.body;

  const t = await sequelize.transaction();

  try {
    // Create the sale
    const venta = await Venta.create(
      {
        id_usuario,
        total: 0, // Initially the total of the sale is 0
      },
      { transaction: t }
    );

    // Create the sale details
    let total = 0;

    const detalles = await Promise.all(
      productos.map(async (item) => {
        const producto = await Producto.findByPk(item.id_producto);
        const detalle = await crearDetalleVenta(
          producto,
          item.cantidad,
          venta.id,
          t
        );
        total += detalle.subtotal;
        return detalle;
      })
    );

    venta.total = total;
    await venta.save({ transaction: t });

    // Check the sale along with its details
    const ventaConDetallesIncluidos = await Venta.findByPk(venta.id, {
      include: [
        {
          model: DetalleVenta,
          as: 'detalles',
          include: [
            {
              model: Producto,
              as: 'producto',
              attributes: ['id', 'nombre', 'descripcion'],
            },
          ],
        },
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombre', 'email'],
        },
      ],
      transaction: t,
    });

    // Restructure data to avoid duplicate information.
    const ventaFormateada = {
      idVenta: ventaConDetallesIncluidos.id,
      total: ventaConDetallesIncluidos.total,
      fecha_venta: ventaConDetallesIncluidos.fecha_venta,
      usuario: ventaConDetallesIncluidos.usuario,
      productos: ventaConDetallesIncluidos.detalles.map(
        ({ producto, cantidad, precio_unitario, subtotal }) => ({
          id: producto.id,
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          cantidad,
          precioPorUnidad: precio_unitario,
          subtotal,
        })
      ),
    };

    await t.commit();

    res.status(200).json({
      message: 'Venta creada correctamente',
      data: ventaFormateada,
    });
  } catch (error) {
    await t.rollback();
    console.error('Error al crear venta:', error);
    if (error.message.includes('Producto no encontrado')) {
      return res.status(404).json({ error: error.message });
    }
    if (error.message.includes('No hay stock disponible')) {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: 'Error al crear venta' });
  }
};

// Delete an existing sale
const eliminarVenta = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the sale exists
    const ventaExist = await Venta.findByPk(id);
    if (!ventaExist) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }

    // Get the sale details
    const detallesVenta = await DetalleVenta.findAll({
      where: { id_venta: id },
    });

    // Restore the stock of the products
    await Promise.all(
      detallesVenta.map(async (detalle) => {
        const producto = await Producto.findByPk(detalle.id_producto);
        if (producto) {
          // Restore the stock
          producto.cantidad_disponible += detalle.cantidad;
          await producto.save();
        }
      })
    );

    // Delete the sale details and the sale
    await DetalleVenta.destroy({ where: { id_venta: id } });
    await Venta.destroy({ where: { id } });

    res.status(200).json({ message: 'Venta cancelada correctamente' });
  } catch (error) {
    console.error('Error al eliminar venta:', error);
    res.status(500).json({ error: 'Error al eliminar venta' });
  }
};

module.exports = {
  listarVentas,
  crearVenta,
  eliminarVenta,
};
