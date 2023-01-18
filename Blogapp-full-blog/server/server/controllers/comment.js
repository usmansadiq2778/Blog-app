const Comment = require("../models/comment");

exports.getAll = async function (req, res) {
  try {
    return Comment
      .findAll()
      .then(comments => res.status(200).send(comments));
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.getComments = async function(request, response){
  try {
      const comments = await Comment.findAll({where:{ postId: request.params.id  }});
      response.status(200).json(comments);
  } catch (error) {
      response.status(500).json(error)
  }
}
exports.create = async function (req, res) {
  try {
    const { commenttext } = req.body
    const { postId, userId } = req.params
    return Comment
      .create({
        commenttext,
        postId,
        userId
      })
      .then(comment => res.status(201).send({
        message: `Your comment ${commenttext} has been posted successfully `,
        comment
      }))
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.update = async function (req, res) {
  try {
    const { commenttext } = req.body
    return Comment
      .findByPk(req.params.commentId)
      .then((comment) => {
        comment.update({
          commenttext: commenttext || comment.commenttext,
        })
          .then((updatedComment) => {
            res.status(200).send({
              message: 'Comment updated successfully',
              data: {
                comment_text: commenttext || updatedComment.commenttext,
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
    return Comment
      .findByPk(req.params.commentId)
      .then(comment => {
        if (!comment) {
          return res.status(400).send({
            message: 'Comment Not Found',
          });
        }
        return comment
          .destroy()
          .then(() => res.status(200).send({
            message: 'Comment successfully deleted'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error))
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};