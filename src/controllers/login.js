const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

require('dotenv').config();

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists via email
    const user = await Usuario.findOne({ where: { email } });

    if (!user) {
      return res
        .status(404)
        .json({ error: 'Usuario no registrado en el sistema' });
    }

    // Check if password matches user's password || bcrypt compares the password entered by the user with the one stored in the database.
    const matchedPassword = await bcrypt.compare(password, user.password_hash);

    if (!matchedPassword) {
      return res
        .status(401)
        .json({ error: 'La contraseña ingresada es incorrecta' });
    }

    // If the user enters the credentials correctly | Generate JWT access token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      // Token expires in 1 hour
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Iniciaste sesión correctamente', token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

module.exports = login;
