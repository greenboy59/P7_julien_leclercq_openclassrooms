const Post = require("../models/Post");
const fs = require("fs");

// Récupère l'intégralité des posts
exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts.reverse());
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
    req.body.file = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  } else {
    req.body.file = null;
  }

  const date = new Date();
  try {
    const post = new Post({
      image: req.body.file,
      userImage: req.body.userImage,
      description: req.body.description,
      userId: req.body.userId,
      userName: req.body.userName,
      usersWhoLiked: [],
      usersWhoDisliked: [],
      comments: [],
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
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((error) => res.status(400).json({ error }));
  } catch {
    (error) => res.status(500).json(error);
  }
};

// Modifie un post
exports.modifyPost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.image) {
        const filename = post.image.split("/images/")[1];
        fs.unlink(`images/${filename}`, (error) => {
          if (error) throw err;
        });
      }

      const postObject = req.file
        ? {
            ...req.body,
            image: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          }
        : {
            ...req.body,
            image: req.body.file,
          };

      // Modification du post si vérif de l'id est ok,sinon envoi d'une erreur code 403
      Post.updateOne(
        { _id: req.params.id },
        { ...postObject, _id: req.params.id },
      )
        .then(() => res.status(200).json({ message: "Post modifié !" }))
        .catch((error) =>
          res
            .status(403)
            .json({ error: error, message: "Requête non autorisée" }),
        );
    })
    .catch((error) => res.status(500).json({ error }));
};

// Supprime un post
exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.image) {
        const filename = post.image.split("/images/")[1];
        fs.unlink(`images/${filename}`, (error) => {
          if (error) throw err;
        });
      }
      Post.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Post supprimé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Ajoute ou retire un like. Méthode Axios findOneAndUpdate utilisée afin de récupérer le tableau des usersLiked et usersDisliked mis à jour
exports.likePost = async (req, res, next) => {
  const postId = req.params?.id;
  const userId = req.body?.userId;
  if (postId && userId) {
    try {
      const post = await Post.findOne({ _id: postId });
      const existingId = post.usersWhoLiked.find((id) => id === userId);
      // 1. Checker si ce user a déjà liké, si c'est le cas enlever le like
      if (existingId) {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          { $pull: { usersWhoLiked: userId } },
          { new: true }, // Permet de récupérer le tableau après mise à jour
        );
        return res.status(201).json(updatedPost);
      }
      // 2. Checker les dislikes et si ce user a disliké, enlever le dislike et ajouter le like
      const userExistingInDislikes = post.usersWhoDisliked.find(
        (id) => id === userId,
      );
      if (userExistingInDislikes) {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          {
            $pull: { usersWhoDisliked: userId },
            $push: { usersWhoLiked: userId },
          },
          { new: true }, // Permet de récupérer le tableau après mise à jour
        );
        return res.status(201).json(updatedPost);
      }
      // 3. Si aucun des cas plus haut n'est rencontré, ajouter le like
      const updatedPost = await Post.findOneAndUpdate(
        { _id: postId },
        { $push: { usersWhoLiked: userId } },
        { new: true }, // Permet de récupérer le tableau après mise à jour
      );
      return res.status(201).json(updatedPost);
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode).json(err);
    }
  }
  return res.status(400).json({ error: "missing required parameters" });
};

// Ajoute ou retire un dislike. Méthode Axios findOneAndUpdate utilisée afin de récupérer le tableau des usersLiked et usersDisliked mis à jour
exports.dislikePost = async (req, res, next) => {
  // Chainage optionnel afin de vérifier si req.params.id et req.body.userId ne sont pas null ou undefined
  const postId = req.params?.id;
  const userId = req.body?.userId;
  if (postId && userId) {
    try {
      const post = await Post.findOne({ _id: postId });
      const existingId = post.usersWhoDisliked.find((id) => id === userId);
      // 1. Checker les dislikes et si user a déjà disliké, enlever le dislike
      if (existingId) {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          { $pull: { usersWhoDisliked: userId } },
          { new: true }, // Permet de récupérer le tableau après mise à jour
        );
        return res.status(201).json(updatedPost);
      }
      // 2. Checker si user a liké, si c'est le cas enlever le like puis ajouter dislike
      const userExistingInLikes = post.usersWhoLiked.find(
        (id) => id === userId,
      );
      if (userExistingInLikes) {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          {
            $pull: { usersWhoLiked: userId },
            $push: { usersWhoDisliked: userId },
          },
          { new: true }, // Permet de récupérer le tableau après mise à jour
        );
        return res.status(201).json(updatedPost);
      }
      // 3. Si aucun des cas plus haut n'est rencontré, ajouter le dislike
      const updatedPost = await Post.findOneAndUpdate(
        { _id: postId },
        { $push: { usersWhoDisliked: userId } },
        { new: true }, // Permet de récupérer le tableau après mise à jour
      );
      return res.status(201).json(updatedPost);
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode).json(err);
    }
  }
  return res.status(400).json({ error: "missing required parameters" });
};

// Créer un commentaire
exports.createComment = async (req, res, next) => {};

exports.modifyComment = async (req, res, next) => {};
