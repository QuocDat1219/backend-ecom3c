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
    fiterCategoryContainer,
    updateimagedetailproduct,
    updateProductsImgDetail
} = require("../controller/productsCtrl");
const upload = require("../utils/multer")

const router = express.Router();


router.post("/", upload.single("image"), createProducts);
router.post("/newimg", upload.single("image"), updateimagedetailproduct);
router.post("/updateimgdetail", upload.single("image"), authMiddleware, isAdmin, updateProductsImgDetail);


router.get("/fitercontainer", fiterCategoryContainer);
router.get("/fitercontainerslug", fiterCategoryContainerBySlug);
router.get("/", getAllProductsPage);
router.get("/fitercategory", fitercategory);
router.get("/getall", getAllProducts);
router.get("/:id", getaProducts);
router.put("/:id", authMiddleware, isAdmin, updateProducts);
router.delete("/:id", authMiddleware, isAdmin, deleteProducts);



module.exports = router;
