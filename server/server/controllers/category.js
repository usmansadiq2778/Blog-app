const Category = require("../models/category");
const { Op } = require("sequelize");

exports.search = async function (req, res) {
  try {
    const key = req.body.key;
    let items = await Category.findAll({
      where: {
        categoryname: {
          [Op.iLike]: `%${key}%`
        }
      }
    });
    return res.status(200).json({
      status: 200,
      data: items,
      message: "Category searched succesfully",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.getAll = async function (req, res) {
  try {
    const items = await Category.findAll({});
    return res.status(200).json({
      status: 200,
      data: items,
      message: "Succesfully Categories Retrieved",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.create = async function (req, res) {
  try {
    const { categoryname} = req.body;
    const CategoryPost = await Category.create({
      categoryname: categoryname,
    });
    return res.status(200).json({ status: 200, data: CategoryPost});
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
exports.update = async function (req, res) {
  try {
    const { categoryname } = req.body
        return Category
          .findByPk(req.params.categoryId)
          .then((category) => {
            category.update({
              categoryname: categoryname || category.categoryname,
            })
            .then((updatedCategory) => {
              res.status(200).send({
                message: 'Category updated successfully',
                data: {
                  categoryname: categoryname|| updatedCategory.categoryname,
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
    return Category
    .findByPk(req.params.categoryId)
    .then(category => {
      if(!category) {
        return res.status(400).send({
        message: 'Category Not Found',
        });
      }
      return category
        .destroy()
        .then(() => res.status(200).send({
          message: 'Category successfully deleted'
        }))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error))
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
