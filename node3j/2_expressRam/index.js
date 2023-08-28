const express = require("express");
var todosRouter = require("./controllers/todos");

let app = express();

app.use(express.json());
app.use("/todos", todosRouter, []);

// configure & start http server
app.listen(3000, () => console.log("Server started (http://localhost:3000/) !"));