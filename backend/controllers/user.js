const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");
const regExModule = require("../utils/regex");

// Création d'un compte utilisateur avec mot de passe fort + vérif des infos envoyées par le frontend
exports.signup = (req, res, next) => {
  if (
    regExModule.regExpStrongPassword.test(req.body.password) &&
    regExModule.regExpEmail.test(req.body.email) &&
    regExModule.regName.test(req.body.lastname) &&
    regExModule.regName.test(req.body.firstname)
  ) {
    // Hashage du mot de passe + salage (10 caractères)
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const user = new User({
          email: req.body.email,
          lastname: req.body.lastname,
          firstname: req.body.firstname,
          password: hash,
        });
        user
          .save()
          .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    res
      .status(400)
      .json({
        message:
          "Mot de passe trop faible, minimum 8 caractères, dont 1 majuscule, 1 minuscule, 1 nombre et 1 caractère spécial",
      });
  }
};

// Login d'un utilisateur existant
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            firstname: user.firstname,
            lastname: user.lastname,
            id: user._id,
            token: jwt.sign(
              { id: user._id },
              process.env.RANDOM_TOKEN_SECRET,
              { expiresIn: "24h" },
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Infos sur l'utilisateur
exports.infos = (req, res, next) => {
  User.findOne({ email: req.body.email }).then((user) => {
    res.status(200).json({
      infos: {
        email: user.email,
      },
    });
  });
};
