const companyService = require('../models/companyServiceModel')
const asyncHandler = require('express-async-handler');
const cloudinary = require("../utils/cloudinarys");

const getAllCompanyService = asyncHandler(async (req, res) => {
  try {
    const allCompanyService = await companyService.find();
    res.json(allCompanyService);
  } catch (error) {
    throw new Error(error);
  }
});
const createCompanyService = asyncHandler(async (req, res) => {
  try {
    const createdCompanyService = await companyService.create(req.body);
    res.json({ status: "Create Success", createdCompanyService });
  } catch (error) {
    throw new Error(error);
  }
});
const updateCompanyService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { imgbody2 } = req.body
  try {

    const image = []

    req.files.forEach(async (file) => {
      console.log(file.fieldname);
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "thanhdat",
      });

      let data = {

        public_id: result.public_id,
        secure_url: result.secure_url

      }
      image.push(data);

    });

    console.log(imgheader);

    const updatedCompanyService = await companyService.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({ status: 'Update Success', companyService: updatedCompanyService })

  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  getAllCompanyService,
  createCompanyService,
  updateCompanyService,
}