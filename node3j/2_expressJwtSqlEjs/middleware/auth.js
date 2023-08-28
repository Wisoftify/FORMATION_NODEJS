const jwt = require('jsonwebtoken');

// Middleware de vérification du JWT
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token d'authentification manquant." });
  }

  try {
    const decodedToken = jwt.verify(token, 'clé_secrète_du_JWT');
    req.utilisateurId = decodedToken.utilisateurId; // Passer l'ID de l'utilisateur au middleware suivant
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Token d'authentification invalide." });
  }
};

module.exports = authMiddleware;