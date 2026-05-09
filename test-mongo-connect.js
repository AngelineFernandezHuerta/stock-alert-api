const mongoose = require('mongoose');
const uri = 'mongodb://Angeline:Tareas26@89.193.156.105:27017/?authSource=admin&tls=true&tlsAllowInvalidCertificates=true';
console.log('Intentando conexión con:', uri);

mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
    tlsAllowInvalidCertificates: true,
    tlsAllowInvalidHostnames: true,
    directConnection: true,
  })
  .then(() => {
    console.log('Conexión directa por IP exitosa');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error directo por IP:', err.message);
    process.exit(1);
  });
