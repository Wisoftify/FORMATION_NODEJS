const express = require("express");
var bodyParser = require("body-parser");

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

//memory
let todos = [];

//router
app.get("/", (req, res) => res.render("index", {todos}));
app.post("/", (req, res) => {
    let todo = req.body;
    todo.id = todos.length + 1;
    todos.push(todo);
    console.log(todos);
    res.render("index", {todos});
})
app.post("/delete", (req, res) => {
    let todo = req.body;
    todos = todos.filter((t) => t.id != todo.id);
    console.log(todos);
    res.render("index", {todos});
})

// configure & start http server
app.listen(3000, () => console.log("Server started (http://localhost:3000/) !"));