const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

var productsSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            unique: true,
            required: true
        },
        name: {
            type: String,
            require: true,
            trim: true,
        },
        price: {
            type: Number,
        },
        description: {
            type: Object,
        },
        quantity: {
            type: Number,
        },
        idCategory: {
            type: Number,
            required: true,
        },
        slug: {
            type: String,
            lowercase: true,
        },
        sold: {
            type: Number,
            default: 0,
        },
        imagesDetail: [
            {
                url: String,
            },
        ],
        
        imagesDefault: {
            type: String,
        },

        guarante: {
            type: String,
        }

    }, {
    timestamps: {
        currentTime: () => new Date(Date.now() + 7 * 60 * 60 * 1000)   
    }
}
);


productsSchema.plugin(autoIncrement.plugin, {
    model: 'productss',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});
module.exports = mongoose.model("productss", productsSchema);
