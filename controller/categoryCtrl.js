const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");

const createCategory = asyncHandler(async (req, res) => {

    try {
        const newCategory = await Category.create(req.body);
        res.json({ status: "Create Success", category: newCategory });
    } catch (error) {
        throw new Error(error)
    }

})

const updateCategory = asyncHandler(async (req, res) => {

    const id = res.params;
    try {
        const updateCategory = await Category.findOneAndUpdate({ id }, req.body, { new: true });
        res.json({ status: 'Update Success', category: updateCategory })
    } catch (error) {
        throw new Error(error);
    }

});

const deleteCategory = asyncHandler(async (req, res) => {

    const { id } = req.params;
    console.log(id);
    try {
        const deleteCategory = await Category.findByIdAndDelete({ _id: id });
        if (deleteCategory == null) {
            res.json({ status: "Category not found" })
        } else {
            res.json({ status: "Delete success", category: deleteCategory })
        }

    } catch (error) {
        throw new Error(error);
    }

});

const getAllCategory = asyncHandler(async (req, res) => {
    try {
        const getCategory = await Category.find();
        res.json({ category: getCategory });
    } catch (error) {
        throw new Error(error);
    }
});

const getaCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const findCategory = await Category.findById({_id : id});
        res.json({ category: findCategory });
    } catch (error) {
        throw new Error(error);
    }
});



module.exports = { createCategory, updateCategory, deleteCategory ,getAllCategory,getaCategory}
