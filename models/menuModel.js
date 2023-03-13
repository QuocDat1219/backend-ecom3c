const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
    },
    doc: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        lowercase: true,
    }

})

module.exports = mongoose.model("Menu", MenuSchema)