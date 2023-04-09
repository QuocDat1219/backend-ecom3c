const Home = require('../models/homeModel');
const asyncHandler = require('express-async-handler');

const getHome = asyncHandler(async (req, res) => {
    try{
        const allhome  = await Home.find();
        res.json(allhome);
    }catch(error) {
        throw new Error(error);
    }
});
const creteHome= asyncHandler(async (req, res) => {
    try {
        const createHome = await Home.create(req.body);
        res.json({status:"Create Success", createHome});
    }catch(error) {
        throw new Error(error);
    }
});
const updateHome = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
      const updatedHome = await Home.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json({ status: 'Update Success', home: updatedHome })
  
    } catch (error) {
      throw new Error(error);
    }
  });
module.exports = {
    getHome,
    creteHome,
    updateHome,
}