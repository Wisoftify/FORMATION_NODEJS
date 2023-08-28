var express = require("express");
var router = express.Router();
const bcrypt = require('bcryptjs');
var User = require("../models/users");
var bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const utilisateurExistant = await User.findOne({ where: { email } });
    if (utilisateurExistant) {
      return res.status(409).json({ message: "Cet email est déjà utilisé." });
    }

    // Chiffrer le mot de passe
    const salt = await bcrypt.genSalt(10);
    const motDePasseChiffre = await bcrypt.hash(password, salt);

    // Créer un nouvel utilisateur avec le mot de passe chiffré
    const nouvelUtilisateur = await User.create({ name, email, password: motDePasseChiffre });

    res.status(201).json({ message: "Inscription réussie.", utilisateur: nouvelUtilisateur });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur est survenue lors de l'inscription." });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const utilisateur = await User.findOne({ where: { email } });
    if (!utilisateur) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    // Vérifier le mot de passe
    const motDePasseValide = await bcrypt.compare(password, utilisateur.password);
    if (!motDePasseValide) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    // Générer un JWT
    const token = jwt.sign({ utilisateurId: utilisateur.id }, 'clé_secrète_du_JWT', { expiresIn: '1h' });

    res.json({ message: "Authentification réussie.", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur est survenue lors de l'authentification." });
  }
});

router.get("/verify", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, 'clé_secrète_du_JWT');
    const utilisateur = await User.findByPk(payload.utilisateurId, { attributes: { exclude: ["password"] } });
    res.json({ utilisateur });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur est survenue lors de la vérification." });
  }
});

module.exports = router;