const mongoose = require('mongoose');
const uri = 'mongodb://Angeline:Tareas26@ac-abmkwc5-shard-00-00.9dtknba.mongodb.net:27017,ac-abmkwc5-shard-00-01.9dtknba.mongodb.net:27017,ac-abmkwc5-shard-00-02.9dtknba.mongodb.net:27017/?authSource=admin&tls=true&retryWrites=true&w=majority';
console.log('Intentando conexión con:', uri);

mongoose.connect(uri, {
  serverSelectionTimeoutMS: 10000,
})
  .then(() => {
    console.log('Conexión directa por hostname exitosa');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error directo por hostname:', err);
    process.exit(1);
  });
