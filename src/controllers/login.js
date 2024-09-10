const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

require('dotenv').config();

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe a través del email
    const user = await Usuario.findOne({ where: { email } });

    if (!user) {
      return res
        .status(404)
        .json({ error: 'Usuario no registrado en el sistema' });
    }

    // Verificar si la contraseña coincide con la del usuario || bcrypt compara la contraseña ingresada por el usuario con la que se encuentra almacenada en la base de datos.
    const matchedPassword = await bcrypt.compare(password, user.password_hash);

    if (!matchedPassword) {
      return res
        .status(401)
        .json({ error: 'La contraseña ingresada es incorrecta' });
    }

    // Si el usuario ingresa correctamente las credenciales | Generar token JWT de acceso
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      // El token expira en 1 hora
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Iniciaste sesión correctamente', token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

module.exports = login;
