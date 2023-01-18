const Role = require('../models/role');

exports.create = async function (req, res) {
	try {
	  const { rolename,roledescription } = req.body
	  return Role
		.create({
		  rolename,
		  roledescription,
		})
		.then(role => res.status(201).send({
		  message: `Your role with the rolename ${rolename} has been created successfully `,
		  role
		}))
	} catch (e) {
	  return res.status(400).json({ status: 400, message: e.message });
	}
  };

exports.getAll = async function (req, res) {
	try {
		const roles = await Role.findAll({});
		return res.status(200).json({
			status: 200,
			data: roles,
			message: 'Succesfully Roles Retrieved',
		});
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};

exports.delete = async function (req, res) {
	try {
		return Role.findByPk(req.params.roleId)
			.then((role) => {
				if (!role) {
					return res.status(400).send({
						message: 'Role Not Found',
					});
				}
				return role
					.destroy()
					.then(() =>
						res.status(200).send({
							message: 'Role successfully deleted',
						})
					)
					.catch((error) => res.status(400).send(error));
			})
			.catch((error) => res.status(400).send(error));
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};

exports.update = async function (req, res) {
	try {
		const { rolename, roledescription } = req.body;
		return Role.findByPk(req.params.roleId)
			.then((role) => {
				role.update({
					rolename: rolename || role.rolename,
					roledescription: roledescription || role.roledescription,
				})
				.then((updatedRole) => {
						res.status(200).send({
							message: 'Role updated successfully',
							data: {
								rolename: rolename || updatedRole.rolename,
								roledescription:roledescription ||updatedRole.roledescription,
							},
						});
					})
					.catch((error) => res.status(400).send(error));
			})
			.catch((error) => res.status(400).send(error));
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};
