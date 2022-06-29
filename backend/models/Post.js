const mongoose = require('mongoose');

// Création d'un schéma de modèle pour les champs d'un post
const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false },
  userImage: { type: String, quired: true},
  date: {type: String, required: true},
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: [String], required: true },
  usersDisliked: { type: [String], required: true },
});

// Export du schéma en tant que modèle mongoose appelé "Post"
module.exports = mongoose.model('Post', postSchema);