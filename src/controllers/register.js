const bcrypt = require('bcryptjs');

const Usuario = require('../models/Usuario');

const register = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    if (!nombre || !email || !password) {
      return res
        .status(400)
        .json({ error: 'Debe ingresar todos los campos requeridos' });
    }

    // Check if the user already exists
    const userExists = await Usuario.findOne({
      where: { email },
    });
    if (userExists) {
      return res.status(400).json({
        error:
          'El correo electrónico ingresado ya está en uso por otro usuario',
      });
    }

    // The password entered by the user is hashed.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await Usuario.create({
      nombre,
      email,
      password_hash: hashedPassword, // Hashed password is stored in the database
    });

    res
      .status(201)
      .json({ message: 'Usuario creado correctamente', data: newUser });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

module.exports = register;
