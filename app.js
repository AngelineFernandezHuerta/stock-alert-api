require('dotenv').config();
const dns = require('dns');
const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const path = require('path');
const Product = require('./src/models/Product');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

dns.setServers(['8.8.8.8', '1.1.1.1']);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB');

    cron.schedule('* * * * *', async () => {
      console.log('--- Ejecutando tarea de calendarización (cada minuto) ---');
      try {
        const productos = await Product.find({ estadoAlerta: false });
        const pendientes = productos.filter(
          (producto) => producto.cantidad < producto.umbralMinimo
        );

        for (const producto of pendientes) {
          console.log(`[ALERTA SMS]: ${producto.nombre} stock bajo. Cantidad: ${producto.cantidad}`);
          producto.estadoAlerta = true;
          await producto.save();
        }

        if (pendientes.length === 0) {
          console.log('[ALERTA SMS]: Sin productos nuevos con stock bajo.');
        }
      } catch (error) {
        console.error('Error en la tarea de cron:', error);
      }
    });
  })
  .catch((err) => console.error('Error de conexión:', err));

app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/productos', require('./src/routes/productRoutes'));

app.get('/dashboard', async (req, res) => {
  try {
    const productos = await Product.find().sort({ nombre: 1 });
    res.render('dashboard', { productos });
  } catch (error) {
    res.status(500).send('Error al cargar el dashboard');
  }
});

app.get('/', (req, res) => {
  res.redirect('/dashboard');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});