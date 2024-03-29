const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

require("dotenv").config();

const User = require("../models/User");
const regExModule = require("../utils/regex");

// Création d'un compte utilisateur avec mot de passe fort + vérif des infos envoyées par le frontend
exports.signup = (req, res, next) => {
  // Test si une image est présente, on la traite sinon on applique l'image par défaut
  req.file
    ? req.body.file = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : req.body.file = `${req.protocol}://${req.get("host")}/images/defaultProfilePic.png`

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
          image: req.body.file,
          lastname: req.body.lastname,
          firstname: req.body.firstname,
          email: req.body.email,
          password: hash,
        });
        user.save()
          .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
          .catch((error) =>
            res.status(400).json({ error, message: "Demande erronée" }),
          );
      })
      .catch((error) => res.status(500).json({ error, message: "Utilisateur déjà éxistant" }),
      );
  } else {
    res.status(400).json({
      message: "Mot de passe trop faible, minimum 8 caractères, dont 1 majuscule, 1 minuscule, 1 nombre et 1 caractère spécial",
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
          // Vérification si le mail du login correspond a celui de l'admin
             res.status(200).json({
              userId: user._id,
              image: user.image,
              firstname: user.firstname,
              lastname: user.lastname,
              token: jwt.sign(
                {
                  userId: user._id,
                  isAdmin: req.body.email === "admin@groupomania.com" || undefined,
                },
                process.env.RANDOM_TOKEN_SECRET,
                { expiresIn: "6h" },
              ),
            })
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Modification de la photo de profil
exports.modifyUser = (req, res, next) => {
  // On met en corrélation l'utilisateur envoyant la requête et celui de la bdd
  User.findOne({ _id: req.params.id }).then((user) => {
    const defaultProfilePic = "http://localhost:3000/images/defaultProfilePic.png";
    const url = "http://localhost:3000/";

    // Si l'ancienne image de profile n'est pas celle par défaut, alors on la supprime du dossier image
    if (user.image !== defaultProfilePic) {
      const imageToDelete = user.image.split(url).join("");
      fs.unlink(`${imageToDelete}`, (error) => {
        if (error) throw error;
      });
    }    

    // On vérifie la présence de la nouvelle image dans la requête et on construit son URL
    if (req.file) {
      const userObject = { image: `${req.protocol}://${req.get("host")}/images/${req.file.filename }`};

      // On met à jour le user dans la bdd avec le nouveau fichier
      User.findOneAndUpdate(
        { _id: req.params.id },
        { ...userObject, _id: req.params.id },
        { new: true },
      )
        // On envoi la nouvelle image dans la réponse afin de s'en servir côté frontend
        .then((response) => { return res.status(200).json(response) })
        .catch((error) => res.status(400).json({ error }));
    }
  });
};
