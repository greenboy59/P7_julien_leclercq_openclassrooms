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
  if (req.body.oldImage) {
    // <- si post.file n'est pas null on supprime le fichier existant
    fs.unlink(`images/${req.body.oldImage}`, (error) => {
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
};

// Like ou dislike un post
exports.likePost = async (req, res, next) => {
  const postId = req.params?.id;
  const userId = req.body?.userId;
  if (postId && userId) {
    try {
      const post = await Post.findOne({ _id: postId });
      const existingId = post.usersLiked.find((id) => id === userId);
      // Checker si user a déjà liké, si c'est le cas enlever le like
      if (existingId) {
        await Post.updateOne(
          { _id: postId },
          { $pull: { usersLiked: userId } },
        )
        const postUpdated = await Post.findOne({ _id: postId });
        return res.status(201).json(postUpdated)
      }        
      // Checker les dislikes et si user a disliké, enlever le dislike et ajouter le like
      const userExistingInDislikes = post.usersDisliked.find((id) => id === userId);
      if (userExistingInDislikes) {
        await Post.updateOne(
          { _id: postId },
          { $pull: { usersDisliked: userId }, $push: { usersLiked: userId } },
        )
        const postUpdated = await Post.findOne({ _id: postId });
        return res.status(201).json(postUpdated)
      }
      // Si aucun des cas plus haut n'est rencontré, ajouter le like
      await Post.updateOne(
        { _id: postId },
        { $push: { usersLiked: userId } },
      )
      const postUpdated = await Post.findOne({ _id: postId });
      return res.status(201).json(postUpdated)
    }
    catch (err) {
      console.log(err);
      return res.status(err.statusCode).json(err);
    }
  }
  return res.status(400).json({ error: "missing required parameters" });
};

exports.dislikePost = async (req, res, next) => {
  const postId = req.params?.id;
  const userId = req.body?.userId;
  if (postId && userId) {
    try {
      const post = await Post.findOne({ _id: postId });
      const existingId = post.usersDisliked.find((id) => id === userId);
      // Checker les dislikes et si user a déjà disliké, enlever le dislike
      if (existingId) {
        await Post.updateOne(
          { _id: postId },
          { $pull: { usersDisliked: userId } },
        );
        const postUpdated = await Post.findOne({ _id: postId });
        return res.status(201).json(postUpdated)
      }
      // Checker si user a liké, si c'est le cas enlever le like puis ajouter dislike
      const userExistingInLikes = post.usersLiked.find((id) => id === userId);
      if (userExistingInLikes) {
        await Post.updateOne(
          { _id: postId },
          { $pull: { usersLiked: userId }, $push: { usersDisliked: userId } },
        );
        const postUpdated = await Post.findOne({ _id: postId });
        return res.status(201).json(postUpdated)
      }
      // Si aucun des cas plus haut n'est rencontré, ajouter le dislike
      await Post.updateOne(
        { _id: postId },
        { $push: { usersDisliked: userId } },
      );
      const postUpdated = await Post.findOne({ _id: postId });
      return res.status(201).json(postUpdated)
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode).json(err);
    }
  }
  return res.status(400).json({ error: "missing required parameters" });
};
