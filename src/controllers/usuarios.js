const Usuario = require('../models/Usuario');

// Obtener todos los usuarios
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

// Eliminar un usuario
const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    // Verificar si el usuario existe
    const usuarioExist = await Usuario.findByPk(id);
    if (!usuarioExist) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Eliminar el usuario
    const deletedUser = await Usuario.destroy({ where: { id } });
    res.status(200).json({
      message: 'Usuario eliminado correctamente',
      data: deletedUser,
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
