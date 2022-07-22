const mongoose = require('mongoose');

// Création d'un schéma de modèle pour les champs d'un post
const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  description: { type: String, required: false },
  image: { type: String, required: false },
  userImage: { type: String, quired: true },
  date: { type: String, required: true },
  usersWhoLiked: { type: [String], required: true },
  usersWhoDisliked: { type: [String], required: true },
  comments: { type: [String], required: false }
});

// Export du modèle mongoose
module.exports = mongoose.model('Post', postSchema);
