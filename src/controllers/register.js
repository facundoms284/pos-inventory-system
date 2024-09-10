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

    // Se procede a hashar la contraseña ingresada por el usuario.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const newUser = await Usuario.create({
      nombre,
      email,
      password_hash: hashedPassword, // La contraseña hashada se almacena en la base de datos en la columna 'password_hash'.
      role: 'admin',
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
