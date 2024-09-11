// Middleware to authenticate users
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization']?.replace('Bearer ', '');

  if (!token) {
    return res
      .status(401)
      .json({ error: 'Acceso no autorizado: token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;
