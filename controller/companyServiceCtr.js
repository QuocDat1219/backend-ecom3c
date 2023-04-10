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

  try {
    const image = [];
    const promises = req.files.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "thanhdat",
      });

      const substring = file.original_filename.split('-').shift();
      console.log(substring);
      if (substring == "imgheader") {
        const data = {
          imgheader: {
            public_id: result.public_id,
            secure_url: result.secure_url,
          }
        }
        image.push(data);
      }
      if (substring == "imgbody1") {
        const data = {
          imgbody1: {
            public_id: result.public_id,
            secure_url: result.secure_url,
          }
        }
        image.push(data);
      }
      if (substring == "imgbody1") {
        const data = {
          imgbody1: {
            public_id: result.public_id,
            secure_url: result.secure_url,
          }
        }
        image.push(data);
      }

    });

    Promise.all(promises)
      .then(() => {
        res.status(200).send({ image });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(err);
      });

    // const updatedCompanyService = await companyService.findByIdAndUpdate(id, req.body, {
    //   new: true,
    // });
    // res.json({ status: 'Update Success', companyService: updatedCompanyService })

  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  getAllCompanyService,
  createCompanyService,
  updateCompanyService,
}