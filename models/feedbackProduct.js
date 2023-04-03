const mongoose = require('mongoose');
var feedbackProductSchema = new mongoose.Schema({
    quality:{
        type: Number, 
        required: true,
        unique: true,
    },
    comment:{
        type: String,
        required: true,
    },
    usename:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    }
},
{
    timestamps: {
      currentTime: () => new Date(Date.now() + 7 * 60 * 60 * 1000)
    }
  }
);