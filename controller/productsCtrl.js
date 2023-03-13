const Products = require("../models/productsModel");
const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createProducts = asyncHandler(async (req, res) => {
    const { idCategory } = req.body;
    console.log(idCategory);
    try {

        const findCategory = await Category.findById({ _id: idCategory })

        if (findCategory != null) {
            if (req.body.name) {
                req.body.slug = slugify(req.body.name);
            }
            const newProduct = await Products.create(req.body);
            res.json({ status: "Create Success", product: newProduct });
        } else {
            res.json({ status: "Category not found" });
        }
    } catch (error) {
        throw new Error(error);
    }
});

const getAllProducts = asyncHandler(async (req, res) => {
    try {
        const getProduct = await Products.find();
        res.json({ products: getProduct });
    } catch (error) {
        throw new Error(error);
    }
});

const getaProducts = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const findProduct = await Products.findById(id);
        res.json({ product: findProduct });

    } catch (error) {
        throw new Error(error);
    }
});

const updateProducts = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try {
        if (req.body.name) {
            req.body.slug = slugify(req.body.name);
        }
        const updateProduct = await Products.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
        });
        res.json({ status: "Update Success", product: updateProduct });
    } catch (error) {
        throw new Error(error);
    }
});

const deleteProducts = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const deleteProduct = await Products.findOneAndDelete({ _id: id });
        if (deleteProduct == null) {
            res.json({ status: "product not found" });

        } else {
            res.json({ status: "Delete success", product: deleteProduct });
        }

    } catch (error) {
        throw new Error(error);
    }
});

module.exports = { createProducts, getAllProducts, getaProducts, updateProducts, deleteProducts };