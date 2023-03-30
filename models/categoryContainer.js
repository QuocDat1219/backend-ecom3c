const mongoose = require('mongoose')
const categoryContainerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        category: [
            {
                idcategory : String
            }
        ]
    },
    {
        timestamps: {
            currentTime: () => new Date(Date.now() + 7 * 60 * 60 * 1000)
        }
    }
)
module.exports = mongoose.model('categoryContainer', categoryContainerSchema);