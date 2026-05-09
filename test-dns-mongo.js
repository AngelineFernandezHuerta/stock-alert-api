const dns = require('dns');
const servers = ['8.8.8.8', '1.1.1.1'];
dns.setServers(servers);
console.log('Usando servidores DNS:', servers.join(', '));

dns.resolveSrv('_mongodb._tcp.cluster0.9dtknba.mongodb.net', (err, res) => {
  console.log('SRV:', err ? err.message : res);
  dns.resolve4('cluster0.9dtknba.mongodb.net', (err2, res2) => {
    console.log('A:', err2 ? err2.message : res2);
  });
});
