const Rolehaspermission = require('../models/rolehaspermission');

exports.getAll = async function (req, res) {
	try {
		const rolehaspermission = await Rolehaspermission.findAll({});
		return res.status(200).json({
			status: 200,
			data: rolehaspermission,
			message: 'Succesfully permissions Retrieved',
		});
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};

exports.create = async function (req, res) {
	try {
		const { roleId, permissionId } = req.params;
		const rolehaspermission = await Rolehaspermission.create({
			roleId: roleId,
			permissionId: permissionId,
		});
		return res.status(200).json({
			status: 200,
			message: 'Role_Permission Created Successfully',
		});
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};

exports.delete = async function (req, res) {
	try {
		return Rolehaspermission.findByPk(req.params.rolehaspermissionId)
			.then((rolehaspermission) => {
				if (!rolehaspermission) {
					return res.status(400).send({
						message: 'Role has permission Not Found',
					});
				}
				return rolehaspermission
					.destroy()
					.then(() =>
						res.status(200).send({
							message: 'Role has permission successfully deleted',
						})
					)
					.catch((error) => res.status(400).send(error));
			})
			.catch((error) => res.status(400).send(error));
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};
