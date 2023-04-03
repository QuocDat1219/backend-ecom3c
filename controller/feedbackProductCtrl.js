const feedbackProduct = require('../models/feedbackProductModel');
const asyncHandler = require("express-async-handler");


const createFeedbackProduct = asyncHandler(async (req,res ) =>{
    console.log(req.body);
    try{
        const newFeedbackProduct = await feedbackProduct.create(req.body);
        res.json({status:"Create Success",newFeedbackProduct});
    }catch(error){
        throw new Error(error);
    }
})

const getAllFeedbackProduct = asyncHandler(async (req,res) => {
    try{
        const allFeedbackProduct = await feedbackProduct.find();
        res.json(allFeedbackProduct);
    }catch(error){
        throw new Error(error);
    }
});

const getAFeedbackProduct = asyncHandler(async (req,res) => {
    const {id} = req.params;
    try{
        const findFeedbackProduct = await feedbackProduct.findById({_id:id});
        res.json({feedbackProduct:findFeedbackProduct});
    }catch(error){
        throw new Error(error);
    };
});

const deleteFeedbackProduct = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    try{
        const deletedCategory = await feedbackProduct.findByIdAndDelete({_id:id});
        if(deletedCategory == null){
            res.json({status:"FeedbackProduct not found"});
        }else{
            res.json({status:"Delete Success", deletedCategory});
        }
    }catch(error){
        throw new Error(error);
    };
});

module.exports = {
    createFeedbackProduct,
    getAllFeedbackProduct,
    getAFeedbackProduct,
    deleteFeedbackProduct,
}