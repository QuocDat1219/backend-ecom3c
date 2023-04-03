const express = require('express');
const {
    createFeedbackBlog,
} = require('../controller/feedbackBlogCtrl')
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post('/', authMiddleware,isAdmin, createFeedbackBlog);
module.exports = router;