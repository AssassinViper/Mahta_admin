let mongoose = require('mongoose');

let puchaseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    price:{
        type: Number,
        required: true
    },
    percent:{
        type: Number
    },
    info:{
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

let Purchase = module.exports = mongoose.model('Purchase', puchaseSchema);

