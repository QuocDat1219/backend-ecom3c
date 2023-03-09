const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema(
    {
        
        name: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    }, {
    timestamps: {
        currentTime: () => new Date(Date.now() + 7 * 60 * 60 * 1000)
    }
})

module.exports = mongoose.model("link",linkSchema)