const express = require("express");
const {
    getHome,
    creteHome,
    updateHome,
} = require("../controller/homeCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", getHome);
router.post("/", creteHome);
router.put("/:id",authMiddleware,isAdmin, updateHome);
module.exports = router;
