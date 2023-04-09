const Products = require("../models/productsModel");
const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const categoryContainer = require("../models/categoryContainer");
const cloudinary = require("../utils/cloudinarys");

const createProducts = asyncHandler(async (req, res) => {


    try {
        if (req.file != undefined) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "products",
            });
            req.body.imagesDefault =
            {
                public_id: result.public_id,
                secure_url: result.secure_url
            }
            req.body.imagesDetail =
                [
                    {
                        public_id: result.public_id,
                        original: result.secure_url,
                        thumbnail: result.secure_url,
                    },
                ]
        }
        const findCategory = await Category.findById({ _id: req.body.idCategory })

        req.body.idContainerCategory = findCategory.idCategoriesContainer
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
    const { id } = req.params;
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

const getAllProductsPage = asyncHandler(async (req, res) => {
    const { container } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    try {
        const count = await Products.countDocuments({ idContainerCategory: container });
        const Product = await Products.find({ idContainerCategory: container })
            .skip((page - 1) * limit)
            .limit(limit);

        const totalPages = Math.ceil(count / limit);

        const response = {
            Product,
            currentPage: page,
            totalPages,
            totalProducts: count,
        };

        res.json(response);
    } catch (error) {
        throw new Error(error);
    }
});

const fitercategory = asyncHandler(async (req, res) => {
    const { categories, brands } = req.query; // lấy danh sách category đã chọn
    const categoryArray = categories.split(',');
    const brandsArray = brands.split(',');
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;


    if (brandsArray == "") {
        try {
            console.log(categoryArray);
            const count = await Products.countDocuments({ idCategory: { $in: categoryArray } });
            const fproducts = await Products.find({
                idCategory: { $in: categoryArray }
            });
            const totalPages = Math.ceil(count / limit);
            const response = {

                fproducts,
                currentPage: page,
                totalPages,
                totalProducts: count,

            };
            res.json(response);
        } catch (error) {
            throw new Error(error);
        }
    } else if (categoryArray == "") {
        try {
            console.log(brandsArray);
            const count = await Products.countDocuments({ idCategory: { $in: categoryArray } });
            const fproducts = await Products.find({
                idBrand: { $in: brandsArray }
            });
            const totalPages = Math.ceil(count / limit);
            const response = {

                fproducts,
                currentPage: page,
                totalPages,
                totalProducts: count,

            };
            res.json(response);
        } catch (error) {
            throw new Error(error);
        }
    } else {
        try {
            const count = await Products.countDocuments({ idCategory: { $in: categoryArray } });
            const fproducts = await Products.find({
                idCategory: { $in: categoryArray },
                idBrand: { $in: brandsArray }
            });
            const totalPages = Math.ceil(count / limit);
            const response = {

                fproducts,
                currentPage: page,
                totalPages,
                totalProducts: count,

            };
            res.json(response);
        } catch (error) {
            throw new Error(error);
        }
    }


})

const fiterCategoryContainer = asyncHandler(async (req, res) => {
    const { idcatecontainer } = req.query; // lấy danh sách category đã chọn


    try {
        const fproducts = await Products.find({
            idContainerCategory: idcatecontainer
        });

        res.json(fproducts);
    } catch (error) {
        throw new Error(error);
    }
})

const fiterCategoryContainerBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.query; // lấy danh sách category đã chọn
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;

    try {

        const fcategoryctn = await categoryContainer.find({ slug: slug })
        console.log(fcategoryctn[0]._id.toHexString());
        const count = await Products.countDocuments({ idContainerCategory: fcategoryctn[0]._id.toHexString() });
        const products = await Products.find({
            idContainerCategory: fcategoryctn[0]._id.toHexString()
        }).skip((page - 1) * limit)
            .limit(limit);

        const totalPages = Math.ceil(count / limit);

        const response = {
            products,
            currentPage: page,
            totalPages,
            totalProducts: count,
        };

        res.json(response);


    } catch (error) {
        throw new Error(error);
    }
})

const updateimagedetailproduct = asyncHandler(async (req, res) => {
    const { id } = req.body
    try {
        if (req.file != undefined) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "products",
            });
            const updatesimg = await Products.updateOne({ _id: id }, {
                $push: {
                    imagesDetail: {
                        public_id: result.public_id,
                        original: result.secure_url,
                        thumbnail: result.secure_url,
                    }
                }
            }, {
                new: true,
            })
            res.json({ status: "Update Success" });
        }

    } catch (error) {
        throw new Error(error);
    }


})
module.exports = { updateimagedetailproduct, fiterCategoryContainerBySlug, fiterCategoryContainer, createProducts, getAllProducts, getaProducts, updateProducts, deleteProducts, getAllProductsPage, fitercategory };
