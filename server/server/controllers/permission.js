const Permission = require('../models/permission');

exports.getAll = async function (req, res) {
	try {
		const permission = await Permission.findAll({});
		return res.status(200).json({
			status: 200,
			data: permission,
			message: 'Succesfully permissions Retrieved',
		});
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};

exports.create = async function (req, res) {
	try {
		const { permissionname,permissiondescription } = req.body;
		const permission = await Permission.create({
			permissionname: permissionname,
			permissiondescription: permissiondescription,
		});
		return res
			.status(200)
			.json({ status: 200, message: 'Permission Created Successfully' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};

exports.delete = async function (req, res) {
	try {
		return Permission.findByPk(req.params.permissionId)
			.then((permission) => {
				if (!permission) {
					return res.status(400).send({
						message: 'Permission Not Found',
					});
				}
				return permission
					.destroy()
					.then(() =>
						res.status(200).send({
							message: 'Permission successfully deleted',
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
		const { permissionname ,permissiondescription} = req.body;
		return Permission.findByPk(req.params.permissionId)
			.then((permission) => {
				permission
					.update({
						permissionname: permissionname || permission.permissionname,
						permissiondescription: permissiondescription || permission.permissiondescription,
					})
					.then((updatedPermission) => {
						res.status(200).send({
							message: 'Permissions updated successfully',
							data: {
								permissionname:permissionname || updatedPermission.permissionname,
								permissiondescription:permissiondescription || updatedPermission.permissiondescription,
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
