const connect = require('connect');
const http = require('http');

// Créer une instance de Connect
const app = connect();

// Middleware pour gérer les requêtes
app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, Connect!');
});

// Créer un serveur HTTP avec Connect
const server = http.createServer(app);

// Écouter sur le port 3000
server.listen(3000, () => {
  console.log('Serveur Connect en cours d\'exécution sur le port 3000');
});
