let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let sequelize = require("./database");
let cors = require("cors");

require("./models/Contact");

const corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));

sequelize.authenticate().then(() => console.log("Database connected"))
                        .catch(err => console.log(err));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());

app.use("/api/contacts", require("./api/contacts"));
app.use("/api/users", require("./api/users"));

app.get("/", (req, res) => {
  res.render("index", {
    user: "Guilian"
  });
})

app.listen(3000, () => console.log("Server running on port 3000"));