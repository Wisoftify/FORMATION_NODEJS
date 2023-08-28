let jwt = require("jsonwebtoken");
let User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    let payload = jwt.verify(token, "azertyuiop");
    const user = await User.findByPk(payload.id, {attributes: {exclude: ["password"]}});

    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send("Invalid token.");
  }
}

module.exports = auth;