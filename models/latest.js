let mongoose = require('mongoose');

let latestSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    code:{
        type: Number,
        required: true,
        unique: true,
        dropDups: true,
        trim: true
    },
    grade: String,
    created: {
        type: Date,
        default: Date.now
    }
});

let latestSchema = module.exports = mongoose.model('latest', latestSchema);
