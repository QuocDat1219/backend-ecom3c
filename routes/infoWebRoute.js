const express = require('express');
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")
const { updateInfoWeb,getInfo } = require("../controller/infoWebCtrl")

router.put("/", authMiddleware, isAdmin, updateInfoWeb);
router.get("/", getInfo);
module.exports = router