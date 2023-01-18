const Rolehaspermission = require('../models/rolehaspermission');
const Permission = require('../models/permission');
function checkPermission(roleId, permName) {
    return new Promise(
        (resolve, reject) => {
            Permission.findOne({
                where: {
                    permissionname: permName
                }
            }).then((perm) => {
                Rolehaspermission.findOne({
                    where: {
                        roleId: roleId,
                        permissionId: perm.id
                    }
                }).then((rolehaspermission) => {
                    if(rolehaspermission) {
                        resolve(rolehaspermission);
                    } else {
                        reject({message: 'Forbidden'});
                    }
                }).catch((error) => {
                    reject(error);
                });
            }).catch(() => {
                reject({message: 'Forbidden'});
            });
        }
    );
}