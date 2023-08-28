var express = require("express");
var router = express.Router();

let todos = [];

router.get("/", (req, res) => {
    res.json(todos);
});

router.post("/", (req, res) => {
    let todo = req.body;
    todo.id = todos.length + 1;
    todos.push(todo);
    res.json(todo);
});

router.put("/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let todo = req.body;
    let index = todos.findIndex((t) => t.id === id);
    if (index >= 0) {
        todos[index].title = todo.title;
        todos[index].completed = todo.completed;
        res.json(todos[index]);
    } else {
        res.status(404).send(`Todo with id ${id} not found`);
    }
});

router.delete("/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let index = todos.findIndex((t) => t.id === id);
    if (index >= 0) {
        todos.splice(index, 1);
        res.json(todos);
    } else {
        res.status(404).send(`Todo with id ${id} not found`);
    }
});

module.exports = router;