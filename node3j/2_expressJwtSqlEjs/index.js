const express = require("express");
var bodyParser = require("body-parser");

const User = require("./models/users");
const Todo = require("./models/todos");

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

//memory
let todos = [];

//router
app.get("/", async (req, res) => {
    try {
      const todos = await Todo.findAll();
      res.render("index", { todos });
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
});
app.post("/", async (req, res) => {
  try {
    let todo = req.body;
    await Todo.create({ title: todo.title });
    const todos = await Todo.findAll();
    res.render("index", { todos });
  } catch (error) {
    console.error("Error creating todo:", error);
  }
});
app.post("/delete", async (req, res) => {
  try {
    let todo = req.body;
    await Todo.destroy({ where: { id: todo.id } });
    const todos = await Todo.findAll();
    res.render("index", { todos });
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
});
  
app.use("/users", require("./controllers/users"));

// configure & start http server
app.listen(3000, () => console.log("Server started (http://localhost:3000/) !"));