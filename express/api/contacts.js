var express = require("express");
var router = express.Router();
let Contact = require("../models/Contact");
let auth = require("../middleware/auth");


router.get("/", async (req, res) => {
  console.log(req.user)
  try {
    const contacts = await Contact.findAll();
    res.json(contacts);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal server error");
  }
});

router.post("/", async (req, res) => {
  try {
    const {id, ...rest} = req.body;

    console.log(rest);
    
    if (!rest.name || !rest.surname) return res.status(400).send("Name and surname are required.");

    const contact = await Contact.create();

    res.json(contact);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal server error");
  }
})

router.get("/:id", async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
  
    if (!contact) return res.status(404).send("The contact with the given ID was not found.");
    res.json(contact);
  } catch (e) {
    return res.status(500).send("Internal server error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);

    if (!contact) return res.status(404).send("The contact with the given ID was not found.");
  
    const {id, ...rest} = req.body;
    const contactUpdated = {
      ...contact,
      ...rest
    };
  
    contacts = await Contact.update(contactUpdated, {
      where: {
        id: req.params.id
      }
    })
  
    res.json(await Contact.findByPk(req.params.id));
  } catch (e) {
    return res.status(500).send("Internal server error");
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
  
    if (!contact) return res.status(404).send("The contact with the given ID was not found.");
  
    await Contact.destroy({
      where: {
        id: req.params.id
      }
    })
  
    res.json(contact);
  } catch (e) {
    return res.status(500).send("Internal server error");
  }
});

module.exports = router;