var express = require("express");
var router = express.Router();
let User = require("../models/User");
let bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  try {
    const {email, password} = req.body;

    const user = await User.findOne({where: {email}});
    if (user) return res.status(400).send("User already registered.");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    let newUser = (await User.create({email, password: hash})).dataValues;
    const {password: _, ...rest} = newUser;

    return res.json(rest);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal server error");
  }
});

let jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const {email, password} = req.body;

  const user = await User.findOne({where: {email}});
  if (!user) return res.status(404).send("User not found.");

  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) return res.status(401).send("Invalid password.");

  const token = jwt.sign({id: user.id}, "azertyuiop", {expiresIn: "1h"});

  return res.json({token});
});

router.get("/verify", async (req, res) => {
  try {
    const token = req.headers.authorization;
  
    let payload = jwt.verify(token, "azertyuiop");
    
    const user = await User.findByPk(payload.id, {attributes: {exclude: ["password"]}});
    return res.json(user);
  } catch (e) {
    console.error(e);
    return res.status(401).send("Invalid token.");
  }
});

module.exports = router;