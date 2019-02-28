let mongoose = require('mongoose');

let dConverter = require('../tools/dateConverter');

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
        type: Number,
        max: 100,
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

let Purchase = module.exports = mongoose.model('Purchase', puchaseSchema);

