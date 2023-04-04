const express = require('express');
const {
    createFeedbackBlog,
    getAllFeedbackProducts,
    getAFeedbackBlog,
    deleteFeedbackBlog,
} = require('../controller/feedbackBlogCtrl')
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post('/', createFeedbackBlog);
router.delete('/:id', authMiddleware,isAdmin, deleteFeedbackBlog);
router.get('/', getAllFeedbackProducts);
router.get('/:id', getAFeedbackBlog);

module.exports = router;