const express = require("express");
const {
    getAboutUs,
    creteAbout,
    updateAboutUs,
} = require("../controller/aboutUsCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", getAboutUs);
router.post("/", creteAbout);
router.put("/:id",authMiddleware,isAdmin, updateAboutUs);
module.exports = router;
