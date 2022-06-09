const Post = require('../models/Post');
const fs = require('fs');

// Récupère l'intégralité des posts
exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => { res.status(200).json(posts) })
    .catch((error) => { res.status(400).json({ error: error }) });
};

// Récupère un post 
exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

// Créer un nouveau post
exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  const post = new Post({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  post.save()
    .then(() => res.status(201).json({ message: 'Post enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

// Modifie un post
exports.modifyPost = (req, res, next) => {
  const postObject = req.file ?
    { ...JSON.parse(req.body.post), imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }
    : { ...req.body };
  // Modification du post si vérif de l'id utilisateur et id post sont ok,sinon envoi d'une erreur code 403
  Post.updateOne(
    { _id: req.params.id },
    { ...postObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: 'Post modifié !' }))
    .catch(error => res.status(403).json({ error: error, message: 'Requête non autorisée' }));
};

// Supprime un post
exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then(post => {
      const filename = post.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Post supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

// Like ou dislike un post
exports.likeOrDislikePost = (req, res, next) => {
  let postId = req.params.id
  let userId = req.body.userId
  let like = req.body.like
  // Récupération de l'id du post séléctionné
  Post.findOne({ _id: postId })
    .then((post) => {
      // Ajoute un like
      if (like === 1 && !post.usersLiked.includes(userId)) {
        Post.updateOne({ _id: postId },
          {
            // Incrémentation des likes et push dans tableau des usersLiked via opérateur mongoose $inc et $push
            $inc: { likes: like++ },
            $push: { usersLiked: userId },
          })
          .then(() => res.status(200).json({ message: 'Like ajouté !' }))
          .catch(error => res.status(400).json({ error }))
      }
      // Ajoute un dislike
      if (like === -1 && !post.usersDisliked.includes(userId)) {
        Post.updateOne({ _id: postId },
          {
            $inc: { dislikes: like * -1 },
            $push: { usersDisliked: userId },
          })
          .then(() => res.status(200).json({ message: 'Dislike ajouté !' }))
          .catch(error => res.status(400).json({ error }))
      }
      // Enlève un like
      if (like === 0 && post.usersLiked.includes(userId)) {
        Post.updateOne({ _id: postId },
          {
            $inc: { likes: - 1 },
            $pull: { usersLiked: userId },
          }
        )
          .then(() => res.status(201).json({ message: 'Like annulé !' }))
          .catch((error) => res.status(400).json({ error }));
      }
      // Enlève un dislike 
      if (post.usersDisliked.includes(userId)) {
        Post.updateOne({ _id: postId },
          {
            $inc: { dislikes: -1 },
            $pull: { usersDisliked: userId },
          }
        )
          .then(() => res.status(201).json({ message: 'Dislike annulé !' }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(400).json({ error }));
};