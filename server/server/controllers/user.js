const User = require("../models/user");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config();

let refreshtokens = [];
exports.register = async function (req, res) {
    try {
        const { name, email, password} = req.body
        const { roleId } = req.params
        const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
            (err) => {
                console.log("Error: ", err);
            }
        );
        return User
            .create({
                name,
                email,
                password,
                roleId
            })
            .then(userData => res.status(201).send({
                success: true,
                message: 'User successfully created',
                userData
            })).catch(error => {
                if (alreadyExistsUser) {
                    res.status(500).json({
                        message: "User with email already exists!",
                    });
                } else if (password.length < 8) {
                    res.status(500).json({
                        message: "Password should be at least 8 characters!",
                    });
                } else {
                    res.status(500).json({
                        message: "Something went wrong!",
                    });
                }
            });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
exports.login = async function (req, res) {
    try {
        User.findOne({ where: { email: req.body.email } }).then(user => {
            if (user === null) {
                res.status(401).json({
                    message: "Invalid credentials!",
                });
            } else {
                if (req.body.password == user.password) {
                    const accesstoken = jwt.sign({
                        email: user.email,
                        userId: user.id
                    }, process.env.JWT_KEY, { expiresIn: "10y" })
                    const refreshtoken = jwt.sign({
                        email: user.email,
                        userId: user.id
                    }, process.env.JWT_REFRESH_KEY, { expiresIn: "10y" })
                    refreshtokens.push(refreshtoken);
                    res.status(200).json({
                        email:user.email,
                        name:user.name,
                        id:user.id,
                        accesstoken,
                    });
                }
                else {
                    res.status(401).json({
                        message: "Invalid credentials!",
                    });
                }
            }
        }).catch(error => {
            res.status(500).json({
                message: "Something went wrong!",
            });
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
exports.renewaccesstoken = async function (req, res) {
    try {
        const refreshtoken = req.body.token;
        if (!refreshtoken || !refreshtokens.includes(refreshtoken)) {
            return res.json({ message: "Refresh token not found, login again" });
        }
        jwt.verify(refreshtoken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (!err) {
                const accesstoken = jwt.sign({ username: user.name }, process.env.JWT_KEY, {
                    expiresIn: "10y"
                });
                return res.json({ success: true, accesstoken });
            } else {
                return res.json({
                    success: false,
                    message: "Invalid refresh token"
                });
            }
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.getUser = async (request, response) => {
    try {
        const user = await User.findByPk(request.params.id);
        response.status(200).json(user);
    } catch (error) {
        response.status(500).json(error)
    }
  }



