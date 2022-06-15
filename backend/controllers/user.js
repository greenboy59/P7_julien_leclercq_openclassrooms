const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const User = require('../models/User');

// Création d'un compte utilisateur avec mot de passe fort
exports.signup = (req, res, next) => {
    // Hashage du mot de passe + salage (24 caractères)
    bcrypt.hash(req.body.password, 24)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash,
          nom: req.body.nom,
          prenom: req.body.prenom
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch((error) => res.status(400).json({ error }))
      })
      .catch(error => res.status(500).json({ error }));
};

 // Login d'un utilisateur existant 
 exports.login = (req, res, next) => {
   User.findOne({ email: req.body.email })
     .then(user => {
       if (!user) {
         return res.status(401).json({ error: 'Utilisateur non trouvé !' });
       }
       bcrypt.compare(req.body.password, user.password)
         .then(valid => {
           if (!valid) {
             return res.status(401).json({ error: 'Mot de passe incorrect !' });
           }
           res.status(200).json({
             userId: user._id,
             token: jwt.sign(
               { userId: user._id },
               process.env.RANDOM_TOKEN_SECRET,
               { expiresIn: '24h' }
             )
           });
         })
         .catch(error => res.status(500).json({ error }));
     })
     .catch(error => res.status(500).json({ error }));
 };

// Infos sur l'utilisateur
exports.infos = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      res.status(200).json({
        infos: {
          email: user.email
        }
      })
    })
};