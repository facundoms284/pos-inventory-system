const Producto = require('../models/Producto');

// List all existing products
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

// Create a new product
const createProduct = async (req, res) => {
  const { nombre, descripcion, precio, cantidad_disponible } = req.body;

  // Validate that the price is not negative
  if (precio <= 0) {
    return res
      .status(400)
      .json({ error: 'El precio debe ser un número positivo.' });
  }

  try {
    // Create a new product
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

// Update an existing product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, cantidad_disponible } = req.body;

  try {
    // Check if the product exists
    const productExist = await Producto.findByPk(id);
    if (!productExist) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Update the product
    const updatedProduct = await Producto.update(
      { nombre, descripcion, precio, cantidad_disponible },
      { where: { id } }
    );

    res.status(200).json({
      message: 'Producto actualizado correctamente',
    });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
};

// Delete an existing product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    // Check if the product exists
    const productExist = await Producto.findByPk(id);
    if (!productExist) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Delete the product
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
