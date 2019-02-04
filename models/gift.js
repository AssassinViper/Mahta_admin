let mongoose = require('mongoose');

let giftSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    price:{
        type: Number,
        required: true
    },
    info:{
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

let Gift = module.exports = mongoose.model('Gift', giftSchema);

