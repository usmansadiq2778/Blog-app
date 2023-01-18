const Post = require("../models/post");
const User = require("../models/user");

exports.getPost = async (request, response) => {
  try {
    Post.belongsTo(User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    User.hasMany(Post, {
      foreignKey: 'userId',
    });
    const post = await Post.findByPk(request.params.id, {
      include: [{
        model: User,
        required: true,
        attributes: ['name']
      }],
    });
    response.status(200).json(post);
  } catch (error) {
    response.status(500).json(error)
  }
}

exports.getPostbyCategory = async function (request, response) {
  try {
    const postbycategory = await Post.findAll({ where: { categoryId: request.params.id } });
    response.status(200).json(postbycategory);
  } catch (error) {
    response.status(500).json(error)
  }
}

exports.getAll = async function (req, res) {
  try {
    Post.belongsTo(User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    User.hasMany(Post, {
      foreignKey: 'userId',
    });
    return Post
      .findAll({
        include: [{
          model: User,
          required: true,
          attributes: ['name']
        }],
      })
      .then(posts => res.status(200).send(posts));
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.create = async function (req, res) {
  try {
 
    const picture = req.file.path;
    console.log("pic",picture)
    const { title, description } = req.body
    const { userId, categoryId } = req.params
    return Post
      .create({
        title,
        description,
        picture,
        userId,
        categoryId
      })
      .then(post => res.status(201).send({
        message: `Your post with the title ${title} has been created successfully `,
        post
      }))
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.update = async function (req, res) {
  try {        
      const picture = req.file?.path? req.file.path:""
      const { title, description } = req.body
      return Post
        .findByPk(req.params.postId)
        .then((post) => {
          post.update({
            title: title !==post.title?title:post.title,
            description: description!==post.description?description:post.description,
            picture: picture || post.picture,
          })
            .then((updatedPost) => {
              res.status(200).send({
                message: 'Post updated successfully',
                data: {
                  title: title || updatedPost.title,
                  description: description || updatedPost.description,
                  picture: picture || updatedPost.picture,
                }
              })
            })
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
exports.delete = async function (req, res) {
  try {
    return Post
      .findByPk(req.params.postId)
      .then(post => {
        if (!post) {
          return res.status(400).send({
            message: 'Post Not Found.',
          });
        }
        return post
          .destroy()
          .then(() => res.status(200).send({
            message: 'Post successfully deleted'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error))
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};