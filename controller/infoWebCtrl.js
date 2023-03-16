const InfoWeb = require("../models/infoWebModel")
const asyncHandler = require("express-async-handler");

const updateInfoWeb = asyncHandler(async (req, res) => {
    try {
        const info = await InfoWeb.find();
        console.log(info[0]._id);
        const updateInfo = await InfoWeb.findByIdAndUpdate({_id: info[0]._id},req.body,{new: true})
        res.json({Status: "Update Success",Info: updateInfo})
    } catch (error) {
        throw new Error(error)
    }


})

const getInfo = asyncHandler(async (req, res) => {
    try {
        const info = await InfoWeb.find();
        res.json({Status: "Update Success",Info: info})
    } catch (error) {
        throw new Error(error)
    }


})

module.exports = { updateInfoWeb,getInfo }