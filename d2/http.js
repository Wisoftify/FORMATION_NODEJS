let connect = require("connect");
let compression = require("compression");

const app = connect();
let todos = [];

const handleRequest = ((req, res) => {
  console.log(req.method, req.url);
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("Hello world");
});

app.use(compression());
app.use(handleRequest);

app.listen(3000, () => {
  console.log("Serveur a l'écoute, port 3000");
});