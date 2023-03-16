const mongoose = require("mongoose");

const InfoWebSchema = mongoose.Schema({
    nameweb: {
        type: String,
    },
    address: {
        type: String,
    },
    nameadmin: {
        type: String,
    },
    hotline: {
        type: String,
    },
    taxcode: {
        type: String,
    },
    pagefbid: {
        type: String,
    },
})

module.exports = mongoose.model("InfoWeb", InfoWebSchema)