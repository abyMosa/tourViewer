const joi = require("@hapi/joi");

const registerValidation = (data) => {
    const schema = joi.object({
        title: joi.string().min(2).max(255).required(),
        firstName: joi.string().min(3).max(255).required(),
        lastName: joi.string().min(4).max(255).required(),
        email: joi.string().min(6).max(255).email().required(),
        password: joi.string().min(6).max(1025).required()
    });
    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = joi.object({
        email: joi.string().min(6).max(255).email().required(),
        password: joi.string().min(6).max(1025).required()
    });
    return schema.validate(data);
}

const validatePassword = (pass) => {
    const schema = joi.object({
        password: joi.string().min(6).max(1025).required()
    });
    return schema.validate({ password: pass });
}

const validateUpdatedUser = (data) => {
    const schema = joi.object({
        title: joi.string().min(2).max(255).required(),
        firstName: joi.string().min(3).max(255).required(),
        lastName: joi.string().min(4).max(255).required(),
        email: joi.string().min(6).max(255).email().required(),
    });
    return schema.validate(data);
}

const toUserNoPassword = (user) => {
    let userNoPass = {
        _id: user._id,
        title: user.title,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        registered: user.registered,
    }
    return userNoPass;
}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.validatePassword = validatePassword;
module.exports.validateUpdatedUser = validateUpdatedUser;
module.exports.toUserNoPassword = toUserNoPassword;