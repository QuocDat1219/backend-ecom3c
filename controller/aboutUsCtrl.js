const AboutUs = require('../models/aboutUsModel');
const asyncHandler = require('express-async-handler');

const getAboutUs = asyncHandler(async (req, res) => {
    try{
        const allAboutUs  = await AboutUs.find();
        res.json(allAboutUs);
    }catch(error) {
        throw new Error(error);
    }
});
const creteAbout = asyncHandler(async (req, res) => {
    try {
        const createAboutUs = await AboutUs.create(req.body);
        res.json({status:"Create Success", createAboutUs});
    }catch(error) {
        throw new Error(error);
    }
});
const updateAboutUs = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
      const updatedAboutUs = await AboutUs.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json({ status: 'Update Success', AboutUs: updatedAboutUs })
  
    } catch (error) {
      throw new Error(error);
    }
  });
module.exports = {
    getAboutUs,
    creteAbout,
    updateAboutUs,
}