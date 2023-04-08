const express = require('express');

const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const {
    fiterCategoryContainerBySlug,
    createProducts,
    getAllProducts,
    getaProducts,
    updateProducts,
    deleteProducts,
    getAllProductsPage,
    fitercategory,
    fiterCategoryContainer
} = require("../controller/productsCtrl");
const upload = require("../utils/multer")

const router = express.Router();
router.get("/fitercontainer", fiterCategoryContainer);
router.get("/fitercontainerslug", fiterCategoryContainerBySlug);
router.post("/", upload.single("image"), authMiddleware, isAdmin, createProducts);
router.get("/", getAllProductsPage);
router.get("/fitercategory", fitercategory);
router.get("/getall", getAllProducts);
router.get("/:id", getaProducts);
router.put("/:id", authMiddleware, isAdmin, updateProducts);
router.delete("/:id", authMiddleware, isAdmin, deleteProducts);



module.exports = router;
