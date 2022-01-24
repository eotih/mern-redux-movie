const Joi = require('joi');

class Validate {
    userValidate = data => {
        const userSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().lowercase().required(),
            password: Joi.string().min(4).max(32).required(),
            mobile: Joi.string().min(10).max(10).required()
        });
        return userSchema.validate(data);
    }
    categoryValidate = data => {
        const categorySchema = Joi.object({
            name: Joi.string().min(3).required(),
            isActive: Joi.boolean()
        });
        return categorySchema.validate(data);
    }
}

module.exports = new Validate();