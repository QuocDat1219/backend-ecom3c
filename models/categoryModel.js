const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

var categorySchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            unique: true,
            required: true
        },
        name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: {
            currentTime: () => new Date(Date.now() + 7 * 60 * 60 * 1000)
        }
    }

);


categorySchema.plugin(autoIncrement.plugin, {
    model: 'category',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model('category', categorySchema);