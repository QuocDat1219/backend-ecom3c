const mongoose = require('mongoose')
const categoryContainerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
    },
    {
        timestamps: {
            currentTime: () => new Date(Date.now() + 7 * 60 * 60 * 1000)
        }
    }
)
module.exports = mongoose.model('categoryContainer', categoryContainerSchema);