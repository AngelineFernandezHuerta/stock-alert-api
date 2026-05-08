const express = require('express');
const auth = require('../middlewares/auth');
const Product = require('../models/Product');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const productos = await Product.find().sort({ nombre: 1 });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { nombre, cantidad, umbralMinimo } = req.body;
    if (nombre == null || cantidad == null || umbralMinimo == null) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    const producto = new Product({
      nombre,
      cantidad,
      umbralMinimo,
      estadoAlerta: false,
    });

    await producto.save();
    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto' });
  }
});

router.patch('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, cantidad, umbralMinimo, estadoAlerta } = req.body;

    const producto = await Product.findById(id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    if (nombre != null) producto.nombre = nombre;
    if (cantidad != null) producto.cantidad = cantidad;
    if (umbralMinimo != null) producto.umbralMinimo = umbralMinimo;
    if (estadoAlerta != null) producto.estadoAlerta = estadoAlerta;

    await producto.save();
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
});

module.exports = router;
