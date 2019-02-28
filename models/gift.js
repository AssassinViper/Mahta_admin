let mongoose = require('mongoose');

let dConverter = require('../tools/dateConverter');

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
        type: String,
        default: () => {
            return dConverter.getLiveDate();
        }
    }
});

let Gift = module.exports = mongoose.model('Gift', giftSchema);

