const Joi = require('joi');

class Validate {
    userValidate = (data) => {
        const userSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().lowercase().required(),
            password: Joi.string().min(4).max(32).required(),
            mobile: Joi.string().min(10).max(10).required()
        });
        return userSchema.validate(data);
    }
    loginValidate = (data) => {
        const userSchema = Joi.object({
            email: Joi.string().email().lowercase().required(),
            password: Joi.string().min(1).max(32).required()
        });
        return userSchema.validate(data);
    }
    categoryValidate = (data) => {
        const categorySchema = Joi.object({
            name: Joi.string().min(3).required(),
            isActive: Joi.boolean()
        });
        return categorySchema.validate(data);
    }
    actorValidate = (data) => {
        const actorSchema = Joi.object({
            name: Joi.string().min(3).required(),
            image: Joi.string().required(),
            DateOfBirth: Joi.date().required()
        });
        return actorSchema.validate(data);
    }
    movieValidate = (data) => {
        const movieSchema = Joi.object({
            name: Joi.string().min(3).required(),
            slug: Joi.string().required(),
            description: Joi.string().required(),
            image: Joi.string().required(),
            country: Joi.string().required(),
            categories: Joi.array().required(),
            releaseDate: Joi.date().required(),
            duration: Joi.number().required(),
            IMDbScore: Joi.number().required(),
            status: Joi.string().required(),
            isHot: Joi.boolean(),
            isFresh: Joi.boolean(),
            isComingSoon: Joi.boolean(),
            isActive: Joi.boolean(),
            isSeries: Joi.boolean()
        });
        return movieSchema.validate(data);
    }
}

module.exports = new Validate();