const Venta = require('../models/Venta');
const DetalleVenta = require('../models/DetalleVenta');
const Producto = require('../models/Producto');
const Usuario = require('../models/Usuario');

// Listar todas las ventas existentes
const listarVentas = async (req, res) => {
  try {
    console.log('Iniciando consulta de ventas...'); // Debug: Verificar si se alcanza esta línea

    const allVentas = await Venta.findAll();

    if (allVentas.length === 0) {
      return res.status(404).json({
        message: 'No se encontraron ventas',
        data: [],
      });
    }

    res.status(200).json({
      message: 'Ventas obtenidas correctamente',
      data: allVentas,
    });
  } catch (error) {
    console.error('Error al obtener todas las ventas:', error);
    res.status(500).json({ error: 'Error al obtener todas las ventas' });
  }
};

const crearVenta = async (req, res) => {
  const { id_usuario, productos } = req.body;

  try {
    // Crear la venta
    const venta = await Venta.create({
      id_usuario,
      total: 0, // Inicialmente el total de la venta es 0
    });

    // Crear los detalles de venta
    let total = 0;
    const detalles = [];

    for (const item of productos) {
      const producto = await Producto.findByPk(item.id_producto);
      if (!producto) {
        return res.status(404).json({
          error: `Producto con id ${item.id_producto} no encontrado`,
        });
      }

      // Verificar si hay suficiente stock disponible para el producto
      if (producto.cantidad_disponible < item.cantidad) {
        return res.status(400).json({
          error: `No hay stock disponible del producto ${producto.nombre} Disponible: ${producto.cantidad_disponible}, solicitado: ${item.cantidad}`,
        });
      }

      const subtotal = producto.precio * item.cantidad;
      total += subtotal;

      // Crear el detalle de la venta
      const detalleVenta = await DetalleVenta.create({
        id_venta: venta.id,
        id_producto: item.id_producto,
        cantidad: item.cantidad,
        precio_unitario: producto.precio,
        subtotal,
      });

      detalles.push(detalleVenta);

      // Actualizar el stock de los productos
      producto.cantidad_disponible -= item.cantidad;
      await producto.save();
    }

    // Actualizar el total de la venta
    venta.total = total;
    await venta.save();

    // Consultar la venta junto con sus detalles
    const ventaConDetallesIncluidos = await Venta.findByPk(venta.id, {
      include: [
        {
          model: DetalleVenta,
          as: 'detalles',
          include: [
            {
              model: Producto,
              as: 'producto',
              attributes: ['id', 'nombre', 'descripcion'], // Solo datos esenciales
            },
          ],
        },
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombre', 'email'],
        },
      ],
    });

    // Reestructuramos los datos para evitar información repetida
    const ventaFormateada = {
      idVenta: ventaConDetallesIncluidos.id,
      total: ventaConDetallesIncluidos.total,
      fecha_venta: ventaConDetallesIncluidos.fecha_venta,
      usuario: ventaConDetallesIncluidos.usuario,
      productos: ventaConDetallesIncluidos.detalles.map((detalle) => ({
        id: detalle.producto.id,
        nombre: detalle.producto.nombre,
        descripcion: detalle.producto.descripcion,
        cantidad: detalle.cantidad,
        precioPorUnidad: detalle.precio_unitario,
        subtotal: detalle.subtotal,
      })),
    };

    res.status(200).json({
      message: 'Venta creada correctamente',
      data: ventaFormateada,
    });
  } catch (error) {
    console.error('Error al crear venta:', error);
    res.status(500).json({ error: 'Error al crear venta' });
  }
};

// Eliminar una venta existente
const eliminarVenta = async (req, res) => {
  const { id } = req.params;

  try {
    // Verificar si la venta existe
    const ventaExist = await Venta.findByPk(id);
    if (!ventaExist) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }

    // Obtener los detalles de la venta
    const detallesVenta = await DetalleVenta.findAll({
      where: { id_venta: id },
    });

    // Restaurar el stock de los productos
    for (const detalle of detallesVenta) {
      const producto = await Producto.findByPk(detalle.id_producto);

      if (producto) {
        // Restaurar el stock
        producto.cantidad_disponible += detalle.cantidad;
        await producto.save();
      }
    }

    // Eliminar los detalles de la venta
    await DetalleVenta.destroy({ where: { id_venta: id } });

    // Eliminar la venta
    const deletedVenta = await Venta.destroy({ where: { id } });

    res.status(200).json({
      message: 'Venta cancelada correctamente',
    });
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
