const Userprofile = require("../models/userprofile");

exports.getAll = async function (req, res) {
  try {
    const userprofile = await Userprofile.findAll({});
    return res.status(200).json({
      status: 200,
      data: userprofile,
      message: 'Succesfully Userprofiles Retrieved',
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.getUserprofile = async (request, response) => {
  Userprofile.findOne({ where: { userId: request.params.id } }).then(user => {
    if (user === null) {
      response.status(401).json({
        message: "Invalid credentials!",
      });
    } else {
      response.status(200).json({
        userprofile: user
      });
    }
  }).catch(error => {
    response.status(500).json({
      message: "Something went wrong!",
    });
  });
}

exports.createorupdate = async function (req, res) {
  try {
    Userprofile.findOne({ where: { userId: req.params.id } }).then(user => {
      if (user !== null) {
          const userprofileId = user.id;
          const picture = req.file?.path? req.file.path:""
          const { gender, phonenumber, bio } = req.body
          return Userprofile
            .findByPk(userprofileId)
            .then((userprofile) => {
              userprofile.update({
                gender: gender !==userprofile.gender?gender:userprofile.gender,
                phonenumber: phonenumber !==userprofile.phonenumber?phonenumber:userprofile.phonenumber,
                bio: bio !==userprofile.bio?bio:userprofile.bio,
                picture: picture || userprofile.picture
              })
                .then((updatedUserprofile) => {
                  res.status(200).send({
                    message: 'User-profile Updated Successfully',
                    data: {
                      gender: gender || updatedUserprofile.gender,
                      phonenumber: phonenumber || updatedUserprofile.phonenumber,
                      bio: bio || updatedUserprofile.bio,
                      picture: picture || updatedUserprofile.picture
                    }
                  })
                })
                .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
      } else {
        const userId = req.params.id;
        const picture = req.file?.path? req.file.path:""
        const { gender, phonenumber, bio } = req.body;
        const users = Userprofile.create({
          gender: gender,
          phonenumber: phonenumber,
          bio: bio,
          picture: picture,
          userId: userId
        });
        return res
          .status(200)
          .json({ status: 200, message: 'User-Profile Created Successfully', users });
      }
    })
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.delete = async function (req, res) {
  try {
    return Userprofile
      .findByPk(req.params.userprofileId)
      .then(userprofile => {
        if (!userprofile) {
          return res.status(400).send({
            message: 'User profile Not Found',
          });
        }
        return userprofile
          .destroy()
          .then(() => res.status(200).send({
            message: 'User Profile successfully deleted'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error))
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

