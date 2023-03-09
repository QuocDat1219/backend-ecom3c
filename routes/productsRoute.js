const express = require('express');

const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const {
    createProducts,
    getAllProducts,
    getaProducts,
    updateProducts,
    deleteProducts,

} = require("../controller/productsCtrl");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProducts);
router.get("/", getAllProducts);
router.get("/:id", getaProducts);
router.put("/:id", authMiddleware, isAdmin, updateProducts);
router.delete("/:id", authMiddleware, isAdmin, deleteProducts);



module.exports = router;
