const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: Object,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    imagesDetail: [
      {
        url: String
      }
    ],
    imageThumbnail: {
      type: String
    },
    video: {
      type: String
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    }
  },
  {
    timestamps: {
      currentTime: () => new Date(Date.now() + 7 * 60 * 60 * 1000)
    }
  }
);

//Export the model
module.exports = mongoose.model("Blog", blogSchema);
