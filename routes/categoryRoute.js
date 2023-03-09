const express = require('express');
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const {
    createCategory,
    updateCategory,
    deleteCategory
} = require("../controller/categoryCtrl");

router.post("/", authMiddleware, isAdmin, createCategory);
router.put("/:id", authMiddleware,isAdmin, updateCategory);
router.delete("/:id", authMiddleware,isAdmin, deleteCategory);

module.exports = router;