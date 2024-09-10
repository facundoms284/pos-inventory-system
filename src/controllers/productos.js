const Producto = require('../models/Producto');

// Listar todos los productos existentes
const listAllProducts = async (req, res) => {
  try {
    const allProducts = await Producto.findAll();
    res.status(200).json({
      message: 'Productos obtenidos correctamente',
      data: allProducts,
    });
  } catch (error) {
    console.error('Error al obtener todos los productos:', error);
    res.status(500).json({ error: 'Error al obtener todos los productos' });
  }
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
  const { nombre, descripcion, precio, cantidad_disponible } = req.body;

  // Validar que el precio no sea negativo
  if (precio <= 0) {
    return res
      .status(400)
      .json({ error: 'El precio debe ser un número positivo.' });
  }

  try {
    // Crear un nuevo producto
    const newProduct = await Producto.create({
      nombre,
      descripcion,
      precio,
      cantidad_disponible,
    });

    res
      .status(201)
      .json({ message: 'Producto creado correctamente', data: newProduct });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

// Actualizar un producto existente
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, cantidad_disponible } = req.body;

  try {
    // Verificar si el producto existe
    const productExist = await Producto.findByPk(id);
    if (!productExist) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Actualizar el producto
    const updatedProduct = await Producto.update(
      { nombre, descripcion, precio, cantidad_disponible },
      { where: { id } }
    );

    res.status(200).json({
      message: 'Producto actualizado correctamente',
      data: updatedProduct,
    });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
};

// Eliminar un producto existente
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    // Verificar si el producto existe
    const productExist = await Producto.findByPk(id);
    if (!productExist) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Eliminar el producto
    const deletedProduct = await Producto.destroy({ where: { id } });
    res.status(200).json({
      message: 'Producto eliminado correctamente',
    });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};

module.exports = {
  listAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
