const mongoose = require('mongoose');
var footerInfoSchema = new mongoose.Schema({
    companymotto:{
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    location: {
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
module.exports = mongoose.model('footerInfo', footerInfoSchema);