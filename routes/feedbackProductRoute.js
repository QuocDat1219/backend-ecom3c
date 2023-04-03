const express = require('express');
const {
    createFeedbackProduct,
    getAllFeedbackProduct,
    getAFeedbackProduct,
    deleteFeedbackProduct,
} = require('../controller/feedbackProductCtrl')
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post('/', authMiddleware,isAdmin, createFeedbackProduct);
router.delete('/:id', authMiddleware,isAdmin, deleteFeedbackProduct);
router.get('/', getAllFeedbackProduct);
router.get('/:id', getAFeedbackProduct);
module.exports = router;