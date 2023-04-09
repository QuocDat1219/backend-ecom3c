const express = require("express");
const {
   getAllCompanyService,
   createCompanyService,
   updateCompanyService,
} = require("../controller/companyServiceCtr");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", getAllCompanyService);
router.post("/", createCompanyService);
router.put("/:id", updateCompanyService);
module.exports = router;
