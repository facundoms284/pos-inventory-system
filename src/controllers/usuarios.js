const Usuario = require('../models/Usuario');

// Get all users
const listarUsuarios = async (req, res) => {
  try {
    const allUsers = await Usuario.findAll();
    res.status(200).json({
      message: 'Usuarios obtenidos correctamente',
      data: allUsers,
    });
  } catch (error) {
    console.error('Error al obtener todos los usuarios:', error);
    res.status(500).json({ error: 'Error al obtener todos los usuarios' });
  }
};

// Delete a user
const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the user exists
    const usuarioExist = await Usuario.findByPk(id);
    if (!usuarioExist) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Delete the user
    const deletedUser = await Usuario.destroy({ where: { id } });
    res.status(200).json({
      message: 'Usuario eliminado correctamente',
    });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};

module.exports = {
  listarUsuarios,
  eliminarUsuario,
};
