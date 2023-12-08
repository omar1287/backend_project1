
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favSchema = new Schema(
    {
        prodcutId: mongoose.Schema.Types.ObjectId,
        userId: mongoose.Schema.Types.ObjectId,
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model('Fav', favSchema);
