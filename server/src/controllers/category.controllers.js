const Category = require('../models/category.models');
const { categoryValidate } = require('../helpers/validation.helpers');

class CategoryController {
    async show(req, res, next) {
        const listCategory = await Category.find();
        res.status(200).json(listCategory);
    }
    async create(req, res, next) {
        const { name } = req.body;

        const { error } = categoryValidate(req.body);
        if (error) throw error.details[0].message;

        const cateExists = await Category.findOne({ name });
        if (cateExists) throw "Category này đã tồn tại.";

        const category = new Category(req.body);
        await category.save();
        res.status(201).json({
            category: category,
            message: 'Category created successfully!',
            status: 200
        });
    }
    async update(req, res, next) {
        const { name, isActive } = req.body;

        // const { error } = categoryValidate(req.body);
        // if (error) throw error.details[0].message;
        
        const cateExists = await Category.findOne({ _id: req.params.id });
        if (!cateExists) throw "Category này không tồn tại.";

        cateExists.name = name;
        cateExists.isActive = isActive;
        await cateExists.save();

        res.status(200).json({
            category: cateExists,
            message: 'Category updated successfully!',
            status: 200
        });
    }
    async deleteCategory(req, res, next) {
        const cateExists = await Category.findOne({ _id: req.params.id });
        if (!cateExists) throw "Category này không tồn tại.";
        await Category.findByIdAndRemove(req.params.id);
        res.status(200).json({
            message: 'Category deleted successfully!',
            category: cateExists,
            status: 200
        });
    }
}

module.exports = new CategoryController();