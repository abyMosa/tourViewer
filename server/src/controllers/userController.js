const User = require("../models/User");
const Token = require("../models/Token");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation, toUserNoPassword, validatePassword, validateUpdatedUser } = require('../helpers/authValidation');
const mongoose = require('mongoose');
const { uuid } = require("uuidv4");
const { sendResetLinkEmail, sendPasswordResetSuccessfulEmail } = require('../helpers/nodeMailerConfig');
const { generateToken } = require("../helpers/verifyToken");


const users = async (req, res) => {
    let users = await User.find();
    res.status(200).send(users.map(toUserNoPassword));

};

const user = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send({ error: true, message: "Invalid user id!" });

    let user = await User.findById(req.params.id);
    if (!user) return res.status(400).send({ error: true, message: "User not found" });

    // let userNoPass: IUserNoPassword = user as IUserNoPassword;
    let userNoPass = toUserNoPassword(user);
    res.status(200).send(userNoPass);
};

const deleteUser = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send({ error: true, message: "Invalid user id!" });

    let user = await User.findById(req.params.id);
    if (!user) return res.status(400).send({ error: true, message: "User not found" });

    try {
        const deleted = await user.delete();
        res.status(200).send(deleted);

    } catch (error) {
        return res.status(400).send({
            error: true,
            message: `error ${error.message}`
        })
    }
};

const updateUserRole = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send({ error: true, message: "Invalid user id!" });

    if (!req.body.role || !['Admin', 'Regular'].includes(req.body.role))
        return res.status(400).send({ error: true, message: "Invalid user role!" });

    let user = await User.findById(req.params.id);
    if (!user) return res.status(400).send({ error: true, message: "User not found" });

    const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: { role: req.body.role } },
    );

    // let updatedUser = await User.findById(req.body.id);
    if (!updatedUser) return res.status(400).send({ error: true, message: "Unexpected Error!!" });

    let userNoPass = toUserNoPassword(updatedUser);
    res.status(200).send(userNoPass);
};

const register = async (req, res) => {
    // validate request
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send({ error: true, message: error.details[0].message });

    // check if user exist 
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send({ error: true, message: "User Exist" });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const users = await User.find();
    const admins = await User.find({ role: 'Admin' });

    // create user
    const user = new User({
        title: req.body.title,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        role: users.length === 0 || admins.length === 0 ? 'Admin' : 'Regular',
        password: hashedPassword
    });
    try {
        const addedUser = await user.save();
        // const token = generateToken(addedUser);
        // res.header("auth-token", token).send({ token: token });
        res.status(200).send();


    } catch (error) {
        console.log(error);
        res.status(400).send({ error: true, message: error });
    }

};

const login = async (req, res) => {
    // validate request
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send({ error: true, message: error.details[0].message });

    // check if user exist 
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ error: true, message: "User doesn't Exist" });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send({ error: true, message: "Incorrect password" });

    const token = generateToken(user);
    res.header("auth-token", token).send({ token: token });
}


const resetpassword = async (req, res) => {

    if (!req.body.email)
        return res.status(400).send({ error: true, message: "Email is required" });

    if (!req.body.origin)
        return res.status(400).send({ error: true, message: "Origin is required" });

    // validate email here

    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send({ error: true, message: `No User found with email ${req.body.email}` });


    let token = await Token.findOne({ user: user._id });
    if (token) await token.deleteOne();

    // create entry in user resetTocken 
    const resetToken = uuid();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(resetToken, salt);
    await new Token({ user: user._id, token: hash, createdAt: Date.now() }).save();
    const link = `${req.body.origin}/?token=${resetToken}&id=${user._id}`;

    try {

        // sendResetLink passing the email and the id
        const result = await sendResetLinkEmail(user, link);
        console.log(result);

        res.status(200).send(result);

    } catch (err) {
        res.status(400).send({ error: true, err });
    }
}

const verifyResetToken = async (req, res) => {
    if (!req.body.token)
        return res.status(400).send({ error: true, message: "Token is required" });

    if (!req.body.password)
        return res.status(400).send({ error: true, message: "Password is required" });

    const { error } = validatePassword(req.body.password);
    if (error) return res.status(400).send({ error: true, message: error.details[0].message });

    if (!req.body.user)
        return res.status(400).send({ error: true, message: "User Id is required" });

    if (!mongoose.Types.ObjectId.isValid(req.body.user))
        return res.status(400).send({ error: true, message: "Invalid user id!" });

    const user = await User.findById({ _id: req.body.user });
    if (!user)
        return res.status(400).send({ error: true, message: "couldnt find user" });

    let passwordResetToken = await Token.findOne({ user: req.body.user });
    if (!passwordResetToken)
        return res.status(400).send({ error: true, message: "Invalid or Expired password reset token" });

    const isValid = await bcrypt.compare(req.body.token, passwordResetToken.token);
    if (!isValid)
        return res.status(400).send({ error: true, message: "Invalid or Expired password token" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const updatedUser = await User.findOneAndUpdate(
        { _id: req.body.user },
        { $set: { password: hash } },
        { new: true }
    );

    if (!updatedUser)
        return res.status(400).send({ error: true, message: "Unexpected error" });

    sendPasswordResetSuccessfulEmail(updatedUser);
    return res.status(200).json();
}

// to update pass while user is logged in. token must be provided
const updateUserPassword = async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send({ error: true, message: "Invalid user id!" });

    if (!req.body.password)
        return res.status(400).send({ error: true, message: "Password is required!" });

    const { error } = validatePassword(req.body.password);
    if (error) return res.status(400).send({ error: true, message: error.details[0].message });

    let user = await User.findById(req.params.id);
    if (!user)
        return res.status(400).send({ error: true, message: "User not found" });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const results = await User.updateOne(
        { _id: user._id },
        { $set: { password: hashedPassword } },
        { new: true }
    );

    if (results.nModified === 0)
        return res.status(400).send({ error: true, message: "Unexpected Error" });


    res.status(200).send(results);
}


// to update pass while user is logged in. token must be provided
const updateUser = async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send({ error: true, message: "Invalid user id!" });

    if (!req.body.title || !req.body.firstName || !req.body.lastName || !req.body.email)
        return res.status(400).send({ error: true, message: "Required fields are title, firstName, lastame, and email" });

    let user = await User.findById(req.params.id);
    if (!user)
        return res.status(400).send({ error: true, message: "User not found" });

    // validate form here
    const { error } = validateUpdatedUser(req.body.password);
    if (error) return res.status(400).send({ error: true, message: error.details[0].message });


    const results = await User.updateOne(
        { _id: user._id },
        {
            $set: {
                title: req.body.title,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
            }
        },
        { new: true }
    );

    if (results.nModified === 0)
        return res.status(400).send({ error: true, message: "Unexpected Error" });

    res.status(200).send(results);
}

module.exports.login = login;
module.exports.register = register;
module.exports.user = user;
module.exports.users = users;

module.exports.deleteUser = deleteUser
module.exports.updateUserRole = updateUserRole
module.exports.resetpassword = resetpassword
module.exports.verifyResetToken = verifyResetToken
module.exports.updateUserPassword = updateUserPassword
module.exports.updateUser = updateUser