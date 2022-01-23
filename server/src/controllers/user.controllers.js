const User = require('../models/user.models');
const bcrypt = require('bcryptjs');

class UserController {
    async show(req, res, next) {
        const listUser = await User.find();
        res.json(listUser);
    }
    async resetPassword(req, res, next) {
        const { email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (!userExists) throw "User with same email already exits.";
        userExists.password = bcrypt.hashSync(password, 8);
        await userExists.save();
        res.status(200).json({
            message: 'Password reset successfully!',
            status: 200
        });
    }
    async updateProfile(req, res, next) {
        const { name, email, mobile } = req.body;
        const { error } = userValidate(req.body);
        if (error) throw error.details[0].message;
        const userExists = await User.findOne({ email });
        if (!userExists) throw "User with same email already exits.";
        userExists.name = name;
        userExists.mobile = mobile;
        await userExists.save();
        res.status(200).json({
            message: 'Update profile successfully!',
            status: 200
        });
    }
    async deleteUser(req, res, next) {
        const { id } = req.body;
        const userExists = await User.findOne({ _id: id });
        if (!userExists) throw "User not found.";
        await userExists.remove();
        res.status(200).json({
            message: 'Delete user successfully!',
            status: 200
        });
    }
    async getById(req, res, next) {
        const userExists = await User.findOne({ _id: req.params.id });
        if (!userExists) throw "User not found.";
        res.status(200).json(userExists);
    }
}
module.exports = new UserController();