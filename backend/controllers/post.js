const Post = require("../models/Post");
const fs = require("fs");

// Récupère l'intégralité des posts
exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
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
  if (req.file) {
    req.body.file = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  } else {
    req.body.file = null;
  };

  const date = new Date()
  try {
    const post = new Post({
      image: req.body.file,
      userImage: req.body.userImage,
      description: req.body.description,
      userId: req.body.userId,
      userName: req.body.userName,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: [],
      date: date.toLocaleString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
    });
    post
      .save()
      .then((post)=> {
        res.status(201).json(post)
      })
      .catch((error) => res.status(400).json({ error }));
  } catch {
    error => res.status(500).json(error);
  }
}

// Modifie un post
exports.modifyPost = (req, res, next) => {
  
  if (req.body.oldImage) { // <- si post.file n'est pas null on supprime le fichier existant
    fs.unlink(`images/${req.body.oldImage}`, (error) => {
      if (error) throw err
    })
  }

  const postObject = req.file
    ? {
        ...req.body,
        image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      }
    : {
      ...req.body,
      image: req.body.file,
    };

  // Modification du post si vérif de l'id est ok,sinon envoi d'une erreur code 403
  Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Post modifié !" }))
    .catch((error) =>
      res.status(403).json({ error: error, message: "Requête non autorisée" }),
    );
};

// Supprime un post
exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      const filename = post.image.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Post supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
}

// Like ou dislike un post
  exports.likeOrDislikePost = (req, res, next) => {
    let postId = req.params.id;
    let userId = req.body.userId;
    let like = req.body.like;
    // Récupération de l'id du post séléctionné
    Post.findOne({ _id: postId })
      .then((post) => {
        // Ajoute un like
        if (
          like === 1 &&
          !post.usersLiked.includes(userId) &&
          !post.usersDisliked.includes(userId)
        ) {
          Post.updateOne(
            { _id: postId },
            {
              // Incrémentation des likes et push dans tableau des usersLiked via opérateur mongoose $inc et $push
              $inc: { likes: like++ },
              $push: { usersLiked: userId },
            },
          )
            .then(() => res.status(200).json({ message: "Like ajouté !" }))
            .catch((error) => res.status(400).json({ error }));
        }

        // Enlève un like
        else if (like === 1? post.usersLiked.includes(userId) : like === -1 && post.usersLiked.includes(userId)) {
          Post.updateOne(
            { _id: postId },
            {
              $inc: { likes: -1 },
              $pull: { usersLiked: userId },
            },
          )
            .then(() => res.status(201).json({ message: "Like annulé !" }))
            .catch((error) => res.status(400).json({ error }));
        }

        // Ajoute un dislike
        if (
          like === -1 &&
          !post.usersDisliked.includes(userId) &&
          !post.usersLiked.includes(userId)
        ) {
          Post.updateOne(
            { _id: postId },
            {
              $inc: { dislikes: like * -1 },
              $push: { usersDisliked: userId },
            },
          )
            .then(() => res.status(200).json({ message: "Dislike ajouté !" }))
            .catch((error) => res.status(400).json({ error }));
        }

        // Enlève un dislike
        else if (like === -1? post.usersDisliked.includes(userId) : like === 1 && post.usersDisliked.includes(userId)) {
          Post.updateOne(
            { _id: postId },
            {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: userId },
            },
          )
            .then(() => res.status(201).json({ message: "Dislike annulé !" }))
            .catch((error) => res.status(400).json({ error }))
        }
      })
      .catch((error) => res.status(400).json({ error }))
  };
