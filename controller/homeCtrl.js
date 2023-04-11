const Home = require("../models/homeModel");
const asyncHandler = require("express-async-handler");

const getHome = asyncHandler(async (req, res) => {
  try {
    const allhome = await Home.find();
    res.json(allhome);
  } catch (error) {
    throw new Error(error);
  }
});
const creteHome = asyncHandler(async (req, res) => {
  try {
    const createHome = await Home.create(req.body);
    res.json({ status: "Create Success", createHome });
  } catch (error) {
    throw new Error(error);
  }
});
const updateHome = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    if (req.files != undefined) {
      const image = [];
      const promises = req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "thanhdat",
        });

        const substring = result.original_filename.split("-").shift();
        console.log(substring);
        if (substring == "imgheader") {
          cloudinary.uploader.destroy(
            getdata[0].imgheader.public_id,
            function (result) {
              console.log(result);
            }
          );
          const data = {
            imgheader: {
              public_id: result.public_id,
              secure_url: result.secure_url,
            },
          };
          image.push(data);
        }
        if (substring == "imgbody1") {
          cloudinary.uploader.destroy(
            getdata[0].imgbody1.public_id,
            function (result) {
              console.log(result);
            }
          );
          const data = {
            imgbody1: {
              public_id: result.public_id,
              secure_url: result.secure_url,
            },
          };
          image.push(data);
        }
        if (substring == "imgbody2") {
          cloudinary.uploader.destroy(
            getdata[0].imgbody2.public_id,
            function (result) {
              console.log(result);
            }
          );
          const data = {
            imgbody2: {
              public_id: result.public_id,
              secure_url: result.secure_url,
            },
          };
          image.push(data);
        }
      });
      
      const updatedHome = await Home.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json({ status: "Update Success", home: updatedHome });
    }
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  getHome,
  creteHome,
  updateHome,
};
