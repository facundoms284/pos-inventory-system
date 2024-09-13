// Middleware to check if the user has the required role
const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    const { role } = req.user;

    if (role !== requiredRole) {
      return res
        .status(403)
        .json({ error: 'Acceso denegado: rol no autorizado' });
    }

    next();
  };
};

module.exports = authorizeRole;
