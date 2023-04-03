const feedbackBlog = require('../models/feedbackBlogModel')
const asyncHandler = require('express-async-handler')

const createFeedbackBlog = asyncHandler(async(req, res) =>{
    try{
        const createdFeedbackBlog = await feedbackBlog.create(req.body);
        res.json({status:"Create Success",createdFeedbackBlog});
    }catch(error){
        throw new Error(error);
    };
})
module.exports = {
    createFeedbackBlog,
}