const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const staticToken = process.env.STATIC_TOKEN;
  if (staticToken && token === staticToken) {
    return next();
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = auth;
