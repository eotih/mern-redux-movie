const Actor = require('../models/actor.models');
const { actorValidate } = require('../helpers/validation.helpers');

class ActorController {
    async show(req, res, next) {
        const listActor = await Actor.find();
        res.status(200).json(listActor);
    }
    async create(req, res, next) {
        const { name } = req.body;

        const { error } = actorValidate(req.body);
        if (error) throw error.details[0].message;

        const actorExists = await Actor.findOne({ name });
        if (actorExists) throw "Actor này đã tồn tại.";

        const newActor = new Actor(req.body);
        await newActor.save();
        res.status(201).json({
            actor: newActor,
            message: 'Actor created successfully!',
            status: 200
        });
    }
    async update(req, res, next) {
        const { name, image, DateOfBirth } = req.body;

        const { error } = actorValidate({ name, image, DateOfBirth });
        if (error) throw error.details[0].message;
        
        const actorExists = await Actor.findOne({ _id: req.params.id });
        if (!actorExists) throw "Actor này không tồn tại.";

        actorExists.name = name;
        actorExists.image = image;
        actorExists.DateOfBirth = DateOfBirth;
        await actorExists.save();

        res.status(200).json({
            actor: actorExists,
            message: 'Actor updated successfully!',
            status: 200
        });
    }
    async deleteActor(req, res, next) {
        const actorExists = await Actor.findOne({ _id: req.params.id });
        if (!actorExists) throw "Actor này không tồn tại.";
        await Actor.findByIdAndRemove(req.params.id);
        res.status(200).json({
            message: 'Actor deleted successfully!',
            actor: actorExists,
            status: 200
        });
    }
}

module.exports = new ActorController();