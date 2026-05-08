const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Usuario y contraseña son obligatorios' });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const validPassword = await user.comparePassword(password);
  if (!validPassword) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET || 'secret123',
    { expiresIn: '4h' }
  );

  res.json({ token });
};

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Usuario y contraseña son obligatorios' });
  }

  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

module.exports = { login, register };
