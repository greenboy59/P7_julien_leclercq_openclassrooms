const jwt = require('jsonwebtoken');
require("dotenv").config();

// Création du token, décodage puis valeur mise dans variable userId
module.exports = (req, res, next) => {
  let userId;
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    userId = decodedToken.userId;
  } catch (err) {
    return res.status(401).send("non autorisé");
  }

  // si la demande contient un ID utilisateur, nous le comparons à celui extrait du token. S'ils sont différents, une erreur est générée
  try {
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Id utilisateur invalide !';
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};